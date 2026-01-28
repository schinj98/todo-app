const express = require('express');
const router = express.Router();
const axios = require('axios');
const Task = require('../models/Task');
const Summary = require('../models/Summary');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId }).sort({ dueDate: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      userId: req.userId
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.userId });
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    Object.keys(req.body).forEach(key => {
      task[key] = req.body[key];
    });

    if (req.body.hasOwnProperty('completed')) {
      task.completed = req.body.completed === true || req.body.completed === 'true';
      
      if (task.completed) {
        task.completedAt = task.completedAt || new Date();
      } else {
        task.completedAt = null;
      }
    }

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/summary', auth, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const completedTasks = await Task.find({
      userId: req.userId,
      completed: true,
      completedAt: { $gte: today }
    });

    if (completedTasks.length === 0) {
      return res.json({ summary: 'No tasks completed today.' });
    }

    const taskList = completedTasks.map(t => `- ${t.title}`).join('\n');
    
    const prompt = `Summarize the following tasks I completed today in a motivating and concise way:\n${taskList}`;

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const summaryText = response.data.choices[0].message.content;

    const savedSummary = await Summary.create({
      userId: req.userId,
      summary: summaryText,
      date: today,
      taskCount: completedTasks.length
    });

    res.json({ 
      summary: summaryText, 
      completedCount: completedTasks.length,
      summaryId: savedSummary._id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/summaries', auth, async (req, res) => {
  try {
    const summaries = await Summary.find({ userId: req.userId })
      .sort({ date: -1 })
      .limit(30);
    res.json(summaries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;