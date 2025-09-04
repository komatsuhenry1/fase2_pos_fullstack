# Fase 2 Postech - API de Usuários

## Configuração do Projeto

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Supabase Configuration
SUPABASE_URL=sua_url_do_supabase_aqui
SUPABASE_KEY=sua_chave_anon_do_supabase_aqui

# Database Configuration
DATABASE_URL=sua_string_de_conexao_postgres_aqui

# Server Configuration
PORT=3000
```

### 3. Configurar o Banco de Dados Supabase

#### Opção A: Via SQL Editor (Recomendado)
1. Acesse o [Dashboard do Supabase](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Vá para "SQL Editor"
4. Execute o script `database-setup.sql` que está na raiz do projeto

#### Opção B: Via Interface Web
1. No Dashboard do Supabase, vá para "Table Editor"
2. Clique em "New Table"
3. Configure a tabela com os seguintes campos:
   - `id` (UUID, Primary Key, Default: gen_random_uuid())
   - `name` (VARCHAR(255), Not Null)
   - `email` (VARCHAR(255), Not Null, Unique)
   - `age` (INTEGER)
   - `created_at` (TIMESTAMP WITH TIME ZONE, Default: NOW())
   - `updated_at` (TIMESTAMP WITH TIME ZONE, Default: NOW())

### 4. Executar o Projeto
```bash
npm start
```

O servidor estará rodando em `http://localhost:3000`

## Endpoints Disponíveis

### Usuários (`/user`)
- `GET /user/posts` - Listar todos os usuários
- `GET /user/posts/:id` - Buscar usuário por ID
- `POST /user/posts` - Criar novo usuário
- `PUT /user/posts/:id` - Atualizar usuário
- `DELETE /user/posts/:id` - Deletar usuário

## Estrutura do Projeto

```
src/
├── config/
│   └── supabaseClient.js    # Configuração do cliente Supabase
├── controller/
│   └── userController.js     # Lógica de negócio para usuários
├── model/
│   └── userModel.js         # Modelo de dados e operações do banco
└── routes/
    └── userRoutes.js        # Definição das rotas da API
```

## Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Supabase** - Backend-as-a-Service (PostgreSQL)
- **Nodemon** - Reinicialização automática do servidor

## Notas Importantes

- O projeto usa **CommonJS** (`require`/`module.exports`) em vez de ES6 modules
- A tabela `users` deve existir no Supabase antes de executar o projeto
- Certifique-se de que as credenciais do Supabase estão corretas no arquivo `.env`
