import express from "express";
const router = express.Router();

import * as TaskController from "../controllers/TaskController"

router.get('/', TaskController.getTasks);
router.get('/:id', TaskController.getTaskById)
router.post('/', TaskController.createTask)
router.put('/:id', TaskController.upateTask)
router.delete('/:id', TaskController.deleteTask)

export default router;