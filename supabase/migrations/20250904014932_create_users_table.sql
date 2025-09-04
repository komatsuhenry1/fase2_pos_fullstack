-- Criar a tabela users
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    age INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- Inserir alguns dados de exemplo
INSERT INTO users (name, email, age) VALUES 
    ('João Silva', 'joao@example.com', 25),
    ('Maria Santos', 'maria@example.com', 30),
    ('Pedro Costa', 'pedro@example.com', 28)
ON CONFLICT (email) DO NOTHING;
