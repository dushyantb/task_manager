import express from 'express'

import * as TaskListController from '../controllers/TaskListController'
const router = express.Router()

router.get('/', TaskListController.getTaskLists)
router.get('/:id', TaskListController.getTaskListById)
router.post('/', TaskListController.createTaskList)
router.put('/:id', TaskListController.upateTaskList)
router.delete('/:id', TaskListController.deleteTaskList)
router.post('/:id/tasks', TaskListController.addTasksToList)
router.delete('/:id/tasks', TaskListController.removeTasksFromList)

export default router
