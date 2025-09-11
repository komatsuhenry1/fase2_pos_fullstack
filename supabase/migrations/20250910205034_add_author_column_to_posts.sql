-- Adicionar coluna author à tabela posts
ALTER TABLE posts ADD COLUMN IF NOT EXISTS author VARCHAR(255) NOT NULL DEFAULT 'Autor Desconhecido';

-- Atualizar posts existentes com valores de exemplo
UPDATE posts SET author = 'João Silva' WHERE title = 'Primeiro Post';
UPDATE posts SET author = 'Maria Santos' WHERE title = 'Segundo Post';
UPDATE posts SET author = 'Pedro Costa' WHERE title = 'Terceiro Post';
