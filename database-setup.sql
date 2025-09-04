-- Script para criar a tabela users no Supabase
-- Execute este script no SQL Editor do seu projeto Supabase

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

-- Habilitar Row Level Security (RLS) se necessário
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Criar políticas RLS básicas (descomente se quiser usar RLS)
-- CREATE POLICY "Users can view their own data" ON users
--     FOR SELECT USING (auth.uid()::text = id::text);

-- CREATE POLICY "Users can update their own data" ON users
--     FOR UPDATE USING (auth.uid()::text = id::text);

-- CREATE POLICY "Users can insert their own data" ON users
--     FOR INSERT WITH CHECK (auth.uid()::text = id::text);

-- Inserir alguns dados de exemplo (opcional)
INSERT INTO users (name, email, age) VALUES 
    ('João Silva', 'joao@example.com', 25),
    ('Maria Santos', 'maria@example.com', 30),
    ('Pedro Costa', 'pedro@example.com', 28)
ON CONFLICT (email) DO NOTHING;

-- Verificar se a tabela foi criada
SELECT * FROM users LIMIT 5;
