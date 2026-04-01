-- productsテーブルに食物繊維（fiber）カラムを追加
ALTER TABLE products ADD COLUMN IF NOT EXISTS fiber NUMERIC DEFAULT NULL;
