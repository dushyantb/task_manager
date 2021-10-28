import express from 'express'

import * as TaskController from '../controllers/TaskController'
const router = express.Router()

router.get('/', TaskController.getTasks)
router.get('/:id', TaskController.getTaskById)
router.post('/', TaskController.createTask)
router.put('/:id', TaskController.upateTask)
router.delete('/:id', TaskController.deleteTask)

export default router
