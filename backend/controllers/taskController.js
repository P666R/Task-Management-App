import asyncHandler from 'express-async-handler';
import TaskService from '../services/taskService.js';

class TaskController {
  getAllTasks = asyncHandler(async (req, res, next) => {
    const tasks = await TaskService.getAllTasks();
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: { tasks },
    });
  });

  getTaskById = asyncHandler(async (req, res, next) => {
    const task = await TaskService.getTaskById(req.params.id);
    res.status(200).json({
      success: true,
      data: { task },
    });
  });

  createTask = asyncHandler(async (req, res, next) => {
    const newTask = await TaskService.createTask(req.body);
    res.status(201).json({
      success: true,
      data: { task: newTask },
    });
  });

  updateTask = asyncHandler(async (req, res, next) => {
    const updatedTask = await TaskService.updateTask(req.params.id, req.body);
    res.status(200).json({
      success: true,
      data: { task: updatedTask },
    });
  });

  deleteTask = asyncHandler(async (req, res, next) => {
    await TaskService.deleteTask(req.params.id);
    res.status(200).json({
      success: true,
      data: null,
    });
  });
}

export default new TaskController();
