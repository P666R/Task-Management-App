import express from 'express';
import TaskController from '../controllers/taskController.js';
import {
  taskCreationValidationRules,
  taskUpdateValidationRules,
  validateTaskIdRules,
  validate,
} from '../utils/validate.js';

const router = express.Router();

router
  .route('/')
  .get(TaskController.getAllTasks)
  .post(taskCreationValidationRules(), validate, TaskController.createTask);

router
  .route('/:id')
  .get(validateTaskIdRules(), validate, TaskController.getTaskById)
  .put(
    validateTaskIdRules(),
    taskUpdateValidationRules(),
    validate,
    TaskController.updateTask,
  )
  .delete(validateTaskIdRules(), validate, TaskController.deleteTask);

export default router;
