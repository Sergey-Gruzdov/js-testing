import mysql from 'mysql2'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const pool = mysql.createPool(
    {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    }
).promise()

export async function getTodos()
{
    const [rows] = await pool.query("SELECT * FROM todo")
    return rows
}

export async function getTodo(id)
{
    const [rows] = await pool.query
    ('SELECT * FROM todo where id = ?', [id])
    return rows[0]
}

export async function createTodo(contents)
{
    const result = await pool.query 
    ('INSERT INTO todo (contents) VALUES (?)', [contents])
    return result
}

export async function deleteTodo(id)
{
    const deleted_task = await pool.query 
    ('DELETE FROM todo WHERE id = ?', [id])
    return deleted_task
}

