# Sistema Acadêmico - Frontend

## Descrição

Interface web responsiva desenvolvida com React e Vite para gerenciamento de alunos e cursos, com autenticação integrada ao backend Spring Boot.

## Tecnologias Utilizadas

- **React 19.2.0** - Biblioteca JavaScript para construção de interfaces
- **Vite 7.2.4** - Build tool e dev server
- **Axios** - Cliente HTTP para comunicação com a API
- **CSS3** - Estilização responsiva

## Funcionalidades

### Autenticação
- Login com HTTP Basic Authentication
- Armazenamento seguro de credenciais
- Logout com limpeza de sessão

### Gerenciamento de Alunos
- Listar todos os alunos
- Criar novo aluno
- Editar aluno existente
- Excluir aluno
- Matricular aluno em cursos
- Desmatricular aluno de cursos

### Gerenciamento de Cursos
- Listar todos os cursos
- Criar novo curso
- Editar curso existente
- Excluir curso
- Visualizar quantidade de alunos matriculados

## Como Rodar Localmente

### Pré-requisitos
- Node.js 18 ou superior
- pnpm (ou npm/yarn)
- Backend rodando em `http://localhost:8080`

### Passos

1. Navegue até a pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
pnpm install
```

3. Inicie o servidor de desenvolvimento:
```bash
pnpm dev
```

4. Acesse a aplicação em:
```
http://localhost:5173
```

### Credenciais de Teste

**Admin:**
- Usuário: `admin`
- Senha: `admin123`

**Usuário Comum:**
- Usuário: `user`
- Senha: `user123`

## Como Consumir a API

A aplicação consome a API REST do backend através do Axios. As configurações estão no arquivo `src/services/api.js`.

### Configuração da URL da API

Por padrão, a aplicação se conecta a `http://localhost:8080/api`. Para alterar, edite o arquivo `.env`:

```env
VITE_API_URL=https://sua-api.com/api
```

### Autenticação

A autenticação é feita via HTTP Basic Auth. O token é armazenado no `localStorage` após o login e enviado automaticamente em todas as requisições através de um interceptor do Axios.

### Endpoints Consumidos

**Alunos:**
- `GET /api/alunos` - Listar alunos
- `GET /api/alunos/{id}` - Buscar aluno
- `POST /api/alunos` - Criar aluno
- `PUT /api/alunos/{id}` - Atualizar aluno
- `DELETE /api/alunos/{id}` - Deletar aluno
- `POST /api/alunos/{alunoId}/cursos/{cursoId}` - Matricular
- `DELETE /api/alunos/{alunoId}/cursos/{cursoId}` - Desmatricular

**Cursos:**
- `GET /api/cursos` - Listar cursos
- `GET /api/cursos/{id}` - Buscar curso
- `POST /api/cursos` - Criar curso
- `PUT /api/cursos/{id}` - Atualizar curso
- `DELETE /api/cursos/{id}` - Deletar curso

## Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/
│   │   ├── Login.jsx
│   │   ├── Login.css
│   │   ├── Alunos.jsx
│   │   ├── Alunos.css
│   │   ├── Cursos.jsx
│   │   └── Cursos.css
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── .env
├── package.json
├── vite.config.js
└── README.md
```

## Build para Produção

Para gerar a build de produção:

```bash
pnpm build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

## Como Fazer Deploy no Vercel

### Método 1: Via CLI

1. Instale a CLI do Vercel:
```bash
npm i -g vercel
```

2. Faça login:
```bash
vercel login
```

3. Na pasta do frontend, execute:
```bash
vercel
```

4. Siga as instruções e configure:
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`

5. Configure a variável de ambiente no painel do Vercel:
   - `VITE_API_URL`: URL do seu backend (ex: `https://seu-backend.onrender.com/api`)

### Método 2: Via GitHub

1. Acesse [https://vercel.com](https://vercel.com)
2. Faça login e clique em "Add New Project"
3. Importe seu repositório do GitHub
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
5. Adicione a variável de ambiente:
   - `VITE_API_URL`: URL do backend
6. Clique em "Deploy"

### Configuração CORS

Certifique-se de que o backend permite requisições da URL do Vercel. No Spring Boot, configure o CORS:

```java
@CrossOrigin(origins = "https://seu-frontend.vercel.app")
```

## Design Responsivo

A interface é totalmente responsiva e se adapta a diferentes tamanhos de tela:
- Desktop: Layout completo com tabelas
- Tablet: Layout ajustado
- Mobile: Layout otimizado para telas pequenas

## Referências

- [React Documentation](https://react.dev/learn)
- [Vite Guide](https://vitejs.dev/guide)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [Vercel Deployment](https://vercel.com/docs)
