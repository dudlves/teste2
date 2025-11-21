# Sistema Acadêmico - Full Stack

Sistema acadêmico completo desenvolvido com Spring Boot 3 (backend) e React + Vite (frontend) para gerenciamento de alunos e cursos.

## Visão Geral

Este projeto implementa um sistema acadêmico full stack com as seguintes características:

- **Backend**: API REST com Spring Boot 3, Spring Security, Spring Data JPA e H2 Database
- **Frontend**: Interface responsiva com React e Vite
- **Segurança**: Autenticação HTTP Basic com Spring Security
- **Monitoramento**: Spring Boot Actuator, Prometheus e Grafana
- **Documentação**: Swagger/OpenAPI
- **Testes**: Testes unitários e testes de carga com Gatling
- **Deploy**: Instruções para Render (backend) e Vercel (frontend)

## Estrutura do Projeto

```
sistema-academico/
├── backend/                 # API REST Spring Boot
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   ├── pom.xml
│   └── README.md
├── frontend/                # Interface React
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   ├── package.json
│   └── README.md
├── docker-compose.yml       # Prometheus e Grafana
├── prometheus.yml           # Configuração do Prometheus
└── README.md               # Este arquivo
```

## Tecnologias Utilizadas

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- Spring Security
- Spring Boot Actuator
- H2 Database
- Springdoc OpenAPI (Swagger)
- Micrometer Prometheus
- Gatling (testes de carga)
- Maven

### Frontend
- React 19.2.0
- Vite 7.2.4
- Axios
- CSS3

### Monitoramento
- Prometheus
- Grafana
- Docker Compose

## Funcionalidades

### Entidades

**Aluno**
- ID, Nome, Email, Matrícula
- Relacionamento N:N com Curso

**Curso**
- ID, Nome, Carga Horária
- Relacionamento N:N com Aluno

### Operações

- CRUD completo de Alunos e Cursos
- Matricular aluno em curso
- Desmatricular aluno de curso
- Autenticação com usuários admin e user
- Métricas e monitoramento em tempo real
- Documentação interativa da API

## Como Executar o Projeto

### Pré-requisitos
- Java 17 ou superior
- Maven 3.6 ou superior
- Node.js 18 ou superior
- Docker e Docker Compose (para monitoramento)

### 1. Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

O backend estará disponível em `http://localhost:8080`

**Credenciais:**
- Admin: `admin` / `admin123`
- User: `user` / `user123`

**Endpoints importantes:**
- API: `http://localhost:8080/api`
- Swagger: `http://localhost:8080/swagger-ui.html`
- H2 Console: `http://localhost:8080/h2-console`
- Actuator: `http://localhost:8080/actuator`
- Métricas Prometheus: `http://localhost:8080/actuator/prometheus`

### 2. Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

O frontend estará disponível em `http://localhost:5173`

### 3. Monitoramento (Opcional)

Na raiz do projeto:

```bash
docker-compose up -d
```

**Acessos:**
- Prometheus: `http://localhost:9090`
- Grafana: `http://localhost:3000` (admin/admin)

## Testes

### Testes Unitários

```bash
cd backend
mvn test
```

### Testes de Carga com Gatling

1. Certifique-se de que o backend está rodando
2. Execute:

```bash
cd backend
mvn gatling:test
```

3. O relatório será gerado em `target/gatling/`

## Documentação da API

Acesse o Swagger UI em `http://localhost:8080/swagger-ui.html` para:
- Visualizar todos os endpoints
- Testar as requisições
- Ver os modelos de dados
- Autenticar com as credenciais fornecidas

## Deploy

### Backend no Render

O projeto inclui um **Dockerfile** otimizado para deploy no Render.

#### Opção 1: Com Docker (Recomendado)

1. Acesse [https://render.com](https://render.com)
2. Crie um novo Web Service
3. Conecte seu repositório
4. Configure:
   - **Environment**: Docker
   - **Root Directory**: `backend`
   - **Dockerfile Path**: `./Dockerfile`
5. Deploy!

#### Opção 2: Sem Docker

1. Selecione **Environment**: Java
2. Configure:
   - **Build Command**: `mvn clean install -DskipTests`
   - **Start Command**: `java -jar target/sistema-academico-1.0.0.jar`
   - **Java Version**: 17

Veja mais detalhes em `backend/README.md`

### Frontend no Vercel

1. Acesse [https://vercel.com](https://vercel.com)
2. Importe seu repositório
3. Configure:
   - **Root Directory**: `frontend`
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
4. Adicione variável de ambiente:
   - `VITE_API_URL`: URL do backend no Render
5. Deploy!

Veja mais detalhes em `frontend/README.md`

## Monitoramento com Prometheus e Grafana

### Configurar Prometheus

O Prometheus já está configurado para coletar métricas do Spring Boot Actuator através do arquivo `prometheus.yml`.

### Configurar Grafana

1. Acesse `http://localhost:3000`
2. Login: admin/admin
3. Adicione Prometheus como datasource:
   - URL: `http://prometheus:9090`
4. Importe dashboard ID `11378` (Spring Boot Statistics)

## Diagrama de Entidades

```
+--------+         +-----------+         +-------+
| Aluno  |---------|AlunoCurso |---------|Curso  |
+--------+         +-----------+         +-------+
| id     |         | aluno_id  |         | id    |
| nome   |         | curso_id  |         | nome  |
| email  |         +-----------+         | carga |
| matr.  |                               | hora. |
+--------+                               +-------+
```

## Endpoints da API

### Alunos
- `GET /api/alunos` - Listar todos
- `GET /api/alunos/{id}` - Buscar por ID
- `POST /api/alunos` - Criar
- `PUT /api/alunos/{id}` - Atualizar
- `DELETE /api/alunos/{id}` - Deletar
- `POST /api/alunos/{alunoId}/cursos/{cursoId}` - Matricular
- `DELETE /api/alunos/{alunoId}/cursos/{cursoId}` - Desmatricular

### Cursos
- `GET /api/cursos` - Listar todos
- `GET /api/cursos/{id}` - Buscar por ID
- `POST /api/cursos` - Criar
- `PUT /api/cursos/{id}` - Atualizar
- `DELETE /api/cursos/{id}` - Deletar

## Segurança

O sistema utiliza Spring Security com autenticação HTTP Basic. Dois usuários estão pré-configurados:

- **admin**: Acesso total (role ADMIN)
- **user**: Acesso de leitura/escrita (role USER)

Os endpoints do Swagger, H2 Console e Actuator estão liberados para facilitar o desenvolvimento.

## Dados de Teste

O sistema vem com dados pré-carregados:

**Cursos:**
1. Engenharia de Software (3600h)
2. Ciência da Computação (3200h)
3. Sistemas de Informação (2800h)

**Alunos:**
1. João Silva (2024001) - Matriculado em Engenharia de Software e Ciência da Computação
2. Maria Santos (2024002) - Matriculada em Ciência da Computação
3. Pedro Oliveira (2024003) - Matriculado em Sistemas de Informação

## Referências

- [Spring Boot Documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- [Spring Security](https://docs.spring.io/spring-security/reference/index.html)
- [Spring Data JPA](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/)
- [Springdoc OpenAPI](https://springdoc.org)
- [React Documentation](https://react.dev/learn)
- [Vite Guide](https://vitejs.dev/guide)
- [Prometheus](https://prometheus.io/docs/introduction/overview/)
- [Grafana](https://grafana.com/docs/grafana/latest/)
- [Gatling](https://gatling.io/docs/gatling/reference/current/)
- [Render Deploy](https://render.com/docs/deploy-spring)
- [Vercel Deploy](https://vercel.com/docs)

## Licença

Este projeto foi desenvolvido para fins educacionais.

## Autor

Sistema Acadêmico - Avaliação 02
