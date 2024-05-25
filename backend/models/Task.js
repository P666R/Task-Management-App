import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';
import { MODEL_ERR_MSGS } from '../constants/index.js';

class Task {
  constructor(title, description, status, dueDate) {
    this.id = uuidv4();
    this.setTitle(title);
    this.setDescription(description);
    this.setStatus(status);
    this.setDueDate(dueDate);
    this.createdAt = this.formatDate(new Date());
    this.updatedAt = this.formatDate(new Date());
  }

  setTitle(title) {
    if (!validator.isLength(title, { min: 1 })) {
      throw new Error(MODEL_ERR_MSGS.TITLE_REQUIRED);
    }
    this.title = title;
  }

  setDescription(description) {
    if (!validator.isLength(description, { min: 1 })) {
      throw new Error(MODEL_ERR_MSGS.DESCRIPTION_REQUIRED);
    }
    this.description = description;
  }

  setStatus(status) {
    if (!['pending', 'in-progress', 'completed'].includes(status)) {
      throw new Error(MODEL_ERR_MSGS.INVALID_STATUS);
    }
    this.status = status;
  }

  setDueDate(dueDate) {
    if (
      !validator.isDate(dueDate, { format: 'YYYY-MM-DD' }) ||
      Number.isNaN(Date.parse(dueDate))
    ) {
      throw new Error(MODEL_ERR_MSGS.INVALID_DATE_FORMAT);
    }
    this.dueDate = dueDate;
  }

  formatDate(date) {
    return date.toISOString().split('T')[0];
  }

  update(data) {
    if (data.title) this.setTitle(data.title);
    if (data.description) this.setDescription(data.description);
    if (data.status) this.setStatus(data.status);
    if (data.dueDate) this.setDueDate(data.dueDate);
    this.updatedAt = this.formatDate(new Date());
  }
}

export default Task;
