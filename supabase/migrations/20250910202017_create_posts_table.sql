-- Criar a tabela posts
CREATE TABLE IF NOT EXISTS posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    author VARCHAR(255) NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at);
CREATE INDEX IF NOT EXISTS idx_posts_title ON posts(title);

-- Inserir alguns dados de exemplo (opcional)
INSERT INTO posts (title, content, author, user_id) VALUES 
    ('Primeiro Post', 'Este é o conteúdo do primeiro post.', 'João Silva', (SELECT id FROM users WHERE email = 'joao@example.com' LIMIT 1)),
    ('Segundo Post', 'Este é o conteúdo do segundo post.', 'Maria Santos', (SELECT id FROM users WHERE email = 'maria@example.com' LIMIT 1)),
    ('Terceiro Post', 'Este é o conteúdo do terceiro post.', 'Pedro Costa', (SELECT id FROM users WHERE email = 'pedro@example.com' LIMIT 1))
ON CONFLICT DO NOTHING;
