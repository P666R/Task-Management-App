import redisClient from '../config/redis.js';
import Task from '../models/Task.js';
import { systemLogs } from '../utils/logger.js';
import NotFoundError from '../utils/NotFoundError.js';
import InternalServerError from '../utils/InternalServerError.js';

class TaskRepository {
  constructor() {
    this.tasks = [];
    this.loadTasks();
  }

  async loadTasks() {
    try {
      const tasks = await redisClient.get('tasks');
      this.tasks = tasks
        ? JSON.parse(tasks).map((taskData) => new Task(taskData))
        : [];
    } catch (err) {
      systemLogs.error('Error loading tasks from Redis', err);
    }
  }

  async saveTasks() {
    try {
      await redisClient.set('tasks', JSON.stringify(this.tasks));
    } catch (err) {
      systemLogs.error('Error saving tasks to Redis', err);
    }
  }

  getAll() {
    return this.tasks;
  }

  getById(id) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundError('Task not found');
    }
    return task;
  }

  async create(taskData) {
    try {
      const task = new Task(
        taskData.title,
        taskData.description,
        taskData.status,
        taskData.dueDate,
      );
      this.tasks.push(task);
      await this.saveTasks();
      return task;
    } catch (error) {
      throw new InternalServerError('Failed to create task');
    }
  }

  async update(id, taskData) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      throw new NotFoundError('Task not found');
    }

    const task = this.tasks[taskIndex];
    task.update(taskData);
    this.tasks[taskIndex] = task;
    await this.saveTasks();
    return task;
  }

  async delete(id) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      throw new NotFoundError('Task not found');
    }

    this.tasks.splice(taskIndex, 1);
    await this.saveTasks();
    return true;
  }
}

export default new TaskRepository();
