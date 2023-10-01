import express from 'express'
import {getTodo, getTodos, deleteTodo, createTodo} from './server.js'
import cors from 'cors'
const app = express()
const PORT = process.env.PORT
app.use(express.json())
app.use(cors());

app.get("/todos", async (req, res) => {
    const todos = await getTodos()
    res.send(todos)
  })

  app.get("/todos/:id", async (req, res) => {
    const id = req.params.id
    const todo = await getTodo(id)
    res.send(todo)
  })

  app.post("/todos", async (req, res) => {
    const {contents} = req.body
    const todo = await createTodo(contents)
    res.status(201).send(todo)
  })
  app.delete("/todos/:id", async (req, res) => {
    const todoId = req.params.id
    const deletedTodo = await deleteTodo(todoId)
    if (deleteTodo)
    {
        res.status(200).send({message:"deleted successfully"})
      }
      else 
      {
        res.status(404).send({message:"not found"})
      }
  })

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('There has been an unexpected error!')
  })

app.listen(process.env.PORT,() => {
    console.log('Server is running on  port',PORT)
  })