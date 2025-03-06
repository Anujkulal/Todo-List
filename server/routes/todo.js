const express = require('express');
const router = express.Router();

const Todo = require('../models/todo');

//create new todo
router.post("/", async (req, res) => {
    const newTodo = new Todo(req.body);
    // console.log("newtodo:",newTodo);
    try {
      const savedTodo = await newTodo.save();
      res.status(201).json(savedTodo);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
})

//get all todos
router.get("/", async (req, res) => {
    try{
        const todos = await Todo.find();
        res.status(200).json(todos);
    }
    catch(err){
        res.status(400).json({ error: err.message});
    }
})

//update todo
router.put("/:id", async (req, res) => {
    try{
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(updatedTodo);
    }
    catch(err){
        res.status(400).json({ error: err.message});
    }
})

//delete todo
router.delete("/:id", async (req, res) => {
    try{
        await Todo.findByIdAndDelete(req.params.id)
        res.json({message: "Todo deleted"});
    }
    catch(err){
        res.status(400).json({ error: err.message});
    }
})

module.exports = router;