import { body, param, validationResult } from 'express-validator';
import validator from 'validator';
import { VALIDATION_ERR_MSGS } from '../constants/index.js';

export const taskCreationValidationRules = () => [
  body('title').notEmpty().withMessage(VALIDATION_ERR_MSGS.TITLE_REQUIRED),
  body('description')
    .notEmpty()
    .withMessage(VALIDATION_ERR_MSGS.DESCRIPTION_REQUIRED),
  body('status')
    .isIn(['pending', 'in-progress', 'completed'])
    .withMessage(VALIDATION_ERR_MSGS.INVALID_STATUS),
  body('dueDate')
    .notEmpty()
    .withMessage(VALIDATION_ERR_MSGS.DUE_DATE_REQUIRED)
    .isISO8601({ strict: true, strictSeparator: true })
    .withMessage(VALIDATION_ERR_MSGS.INVALID_DUE_DATE)
    .custom((value) => {
      if (!validator.isDate(value, { format: 'YYYY-MM-DD' })) {
        throw new Error(VALIDATION_ERR_MSGS.DUE_DATE_FORMAT);
      }
      return true;
    }),
];

export const taskUpdateValidationRules = () => [
  body('title')
    .optional()
    .notEmpty()
    .withMessage(VALIDATION_ERR_MSGS.TITLE_EMPTY),
  body('description')
    .optional()
    .notEmpty()
    .withMessage(VALIDATION_ERR_MSGS.DESCRIPTION_EMPTY),
  body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'completed'])
    .withMessage(VALIDATION_ERR_MSGS.INVALID_STATUS),
  body('dueDate')
    .optional()
    .isISO8601({ strict: true, strictSeparator: true })
    .withMessage(VALIDATION_ERR_MSGS.INVALID_DUE_DATE)
    .custom((value) => {
      if (!validator.isDate(value, { format: 'YYYY-MM-DD' })) {
        throw new Error(VALIDATION_ERR_MSGS.DUE_DATE_FORMAT);
      }
      return true;
    }),
];

export const validateTaskIdRules = () => [
  param('id').isUUID().withMessage(VALIDATION_ERR_MSGS.INVALID_TASK_ID),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(
      `${VALIDATION_ERR_MSGS.VALIDATION_FAILED}: ${errors
        .array()
        .map((e) => e.msg)
        .join(', ')}`,
    );
  }
  next();
};
