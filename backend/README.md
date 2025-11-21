# Sistema Acadêmico - Backend

## Descrição do Projeto

Sistema acadêmico desenvolvido com Spring Boot 3 para gerenciamento de alunos e cursos, incluindo relacionamento N:N entre as entidades, autenticação com Spring Security, monitoramento com Actuator/Prometheus/Grafana, documentação com Swagger e testes de carga com Gatling.

## Tecnologias Utilizadas

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data JPA** - Persistência de dados
- **Spring Security** - Autenticação e autorização
- **Spring Boot Actuator** - Monitoramento e métricas
- **H2 Database** - Banco de dados em memória
- **Springdoc OpenAPI** - Documentação da API (Swagger)
- **Micrometer Prometheus** - Exportação de métricas
- **Gatling** - Testes de carga e stress
- **Lombok** - Redução de código boilerplate
- **Maven** - Gerenciamento de dependências

## Entidades

### Aluno
- `id` (Long) - Identificador único
- `nome` (String) - Nome do aluno
- `email` (String) - Email único
- `matricula` (String) - Matrícula única
- `cursos` (Set<Curso>) - Relacionamento N:N com Curso

### Curso
- `id` (Long) - Identificador único
- `nome` (String) - Nome do curso
- `cargaHoraria` (Integer) - Carga horária em horas
- `alunos` (Set<Aluno>) - Relacionamento N:N com Aluno

## Como Rodar Localmente

### Pré-requisitos
- Java 17 ou superior
- Maven 3.6 ou superior

### Passos

1. Clone o repositório e navegue até a pasta do backend:
```bash
cd backend
```

2. Compile e execute a aplicação:
```bash
mvn clean install
mvn spring-boot:run
```

3. A aplicação estará disponível em `http://localhost:8080`

## Como Acessar Swagger e Autenticação

### Swagger UI
Acesse a documentação interativa da API em:
```
http://localhost:8080/swagger-ui.html
```

### Autenticação
A API utiliza **HTTP Basic Authentication**. Use as seguintes credenciais:

**Usuário Admin:**
- Username: `admin`
- Password: `admin123`

**Usuário Comum:**
- Username: `user`
- Password: `user123`

No Swagger, clique no botão "Authorize" e insira as credenciais acima.

### Console H2
Para acessar o console do banco de dados H2:
```
http://localhost:8080/h2-console
```

**Configurações de conexão:**
- JDBC URL: `jdbc:h2:mem:academicodb`
- Username: `sa`
- Password: (deixe em branco)

## Endpoints da API

### Alunos
- `GET /api/alunos` - Listar todos os alunos
- `GET /api/alunos/{id}` - Buscar aluno por ID
- `POST /api/alunos` - Criar novo aluno
- `PUT /api/alunos/{id}` - Atualizar aluno
- `DELETE /api/alunos/{id}` - Deletar aluno
- `POST /api/alunos/{alunoId}/cursos/{cursoId}` - Matricular aluno em curso
- `DELETE /api/alunos/{alunoId}/cursos/{cursoId}` - Desmatricular aluno de curso

### Cursos
- `GET /api/cursos` - Listar todos os cursos
- `GET /api/cursos/{id}` - Buscar curso por ID
- `POST /api/cursos` - Criar novo curso
- `PUT /api/cursos/{id}` - Atualizar curso
- `DELETE /api/cursos/{id}` - Deletar curso

## Como Configurar Prometheus e Grafana

### 1. Iniciar os containers Docker

Na raiz do projeto (onde está o docker-compose.yml):
```bash
docker-compose up -d
```

### 2. Acessar Prometheus
```
http://localhost:9090
```

Verifique se o target `spring-boot-app` está UP em Status > Targets.

### 3. Acessar Grafana
```
http://localhost:3000
```

**Credenciais:**
- Username: `admin`
- Password: `admin`

### 4. Configurar Datasource no Grafana

1. Vá em Configuration > Data Sources
2. Clique em "Add data source"
3. Selecione "Prometheus"
4. Configure a URL: `http://prometheus:9090`
5. Clique em "Save & Test"

### 5. Importar Dashboard

1. Vá em Dashboards > Import
2. Use o ID do dashboard: `11378` (Spring Boot 2.1 Statistics)
3. Selecione o datasource Prometheus
4. Clique em "Import"

## Como Executar Testes de Carga e Stress com Gatling

### Executar a aplicação
Certifique-se de que a aplicação está rodando:
```bash
mvn spring-boot:run
```

### Executar os testes Gatling (em outro terminal)
```bash
mvn gatling:test
```

### Visualizar relatórios
Após a execução, o Gatling gera um relatório HTML em:
```
target/gatling/alunosimulation-[timestamp]/index.html
```

Abra o arquivo no navegador para visualizar:
- Tempo de resposta
- Taxa de sucesso/erro
- Throughput (requisições por segundo)
- Percentis de latência

### Configuração do teste
O teste simula:
- 10 usuários simultâneos iniciais
- Rampa de 50 usuários em 30 segundos
- 20 usuários constantes por segundo durante 60 segundos

## Como Fazer Deploy no Render

### Opção 1: Deploy com Docker (Recomendado)

O projeto já inclui um `Dockerfile` otimizado com build em múltiplos estágios.

#### 1. Testar localmente com Docker

```bash
# Build da imagem
docker build -t sistema-academico .

# Executar container
docker run -p 8080:8080 sistema-academico
```

#### 2. Deploy no Render com Docker

1. Acesse [https://render.com](https://render.com)
2. Crie uma conta ou faça login
3. Clique em "New +" e selecione "Web Service"
4. Conecte seu repositório GitHub
5. Configure:
   - **Name**: sistema-academico-backend
   - **Environment**: Docker
   - **Root Directory**: `backend`
   - **Dockerfile Path**: `./Dockerfile`
6. Clique em "Create Web Service"

### Opção 2: Deploy sem Docker

Se preferir não usar Docker:

1. No Render, selecione **Environment**: Java
2. Configure:
   - **Build Command**: `mvn clean install -DskipTests`
   - **Start Command**: `java -jar target/sistema-academico-1.0.0.jar`
   - **Java Version**: 17

### 3. Configurar variáveis de ambiente (opcional)

No painel do Render, vá em Environment e adicione:
```
JAVA_OPTS=-Xmx512m
```

### 4. Acessar a aplicação

Após o deploy, a URL será algo como:
```
https://sistema-academico-backend.onrender.com
```

Acesse a documentação em:
```
https://sistema-academico-backend.onrender.com/swagger-ui.html
```

## Testes Unitários

Execute os testes unitários com:
```bash
mvn test
```

## Referências Utilizadas

- [Spring Boot Documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- [Spring Data JPA](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/)
- [Spring Security](https://docs.spring.io/spring-security/reference/index.html)
- [Spring Boot Actuator](https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html)
- [Springdoc OpenAPI](https://springdoc.org)
- [Prometheus](https://prometheus.io/docs/introduction/overview/)
- [Grafana](https://grafana.com/docs/grafana/latest/)
- [Gatling](https://gatling.io/docs/gatling/reference/current/)
- [Render Deploy Spring](https://render.com/docs/deploy-spring)
