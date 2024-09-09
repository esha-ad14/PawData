const express = require("express")
const app = express()
const pool = require("./db")

app.use(express.json()) // => req.body

//ROUTES//

//get all todos

app.get("/commands", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM commands")

    res.json(allTodos.rows)
  } catch (err) {
    console.error(err.message);
  }
})

//get a todo

app.get("/commands/:command_id", async (req, res) => {
  const {id} = req.params
  try {
    const todo = await pool.query("SELECT * FROM commands WHERE command_id=$1", [id])
  
    res.json(todo.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

//create a todo

app.post("/commands", async (req, res) => {
  try {
    const {command} = req.body
    const newCommand = await pool.query("INSERT INTO commands (command) VALUES ($1) RETURNING *", [command])

    res.json(newCommand.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

//update a todo

app.put("/commands/:command_id", async (req, res) => {
  try {
    const {command_id} = req.params
    const {command} = req.body

    const updateCommand = await pool.query("UPDATE commands SET command=$1 WHERE command_id=$2", [command, command_id])

    res.json("Command was updated")
  } catch (err) {
    console.error(err.message)
  }
})

//delete a todo

app.delete("/commands/:command_id", async (req, res) => {
  try {
    const {command_id} = req.params
    const deleteCommand = await pool.query ("DELETE FROM commands WHERE command_id=$1", [command_id])

    res.json("Todo was successfully deleted")
  } catch (err) {
    console.error(err.message)
  }
})

app.listen(5000, () => {
  console.log("server is listening on port 5000")
})