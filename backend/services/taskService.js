import taskRepository from '../repositories/taskRepository.js';

class TaskService {
  async getAllTasks() {
    return taskRepository.getAll();
  }

  async getTaskById(id) {
    return taskRepository.getById(id);
  }

  async createTask(taskData) {
    return taskRepository.create(taskData);
  }

  async updateTask(id, taskData) {
    return taskRepository.update(id, taskData);
  }

  async deleteTask(id) {
    return taskRepository.delete(id);
  }
}

export default new TaskService();
