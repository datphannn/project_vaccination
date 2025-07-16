import { Pool } from 'pg';
import { createClient } from '@supabase/supabase-js';
let pool: Pool | null = null;

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
  }
  return pool;
}

export async function query(text: string, params?: any[]) {
  const pool = getPool();
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}

// Khởi tạo bảng vaccines nếu chưa tồn tại
export async function initializeDatabase() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS vaccines (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      age_range VARCHAR(100) NOT NULL,
      price VARCHAR(50) NOT NULL,
      description TEXT,
      stock_quantity INTEGER DEFAULT 0,
      manufacturer VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await query(createTableQuery);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}