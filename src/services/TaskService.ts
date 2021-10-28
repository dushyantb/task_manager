import * as TaskModel from '../models/TaskModel'

async function getTasks () {
  return await TaskModel.getAllTasks()
}

async function getTaskById (params) {
  const id = parseInt(params.id as string, 10)
  return await TaskModel.getTaskById(id)
}

async function createTask (taskData) {
  return await TaskModel.createTask(taskData)
}

async function upateTask (params, taskData) {
  const id = parseInt(params.id as string, 10)
  return await TaskModel.upateTask(id, taskData)
}

async function deleteTask (params) {
  const id = parseInt(params.id as string, 10)
  return await TaskModel.deleteTask(id)
}

export {
  getTasks,
  getTaskById,
  createTask,
  upateTask,
  deleteTask
}
