import * as TaskModel from "../models/TaskModel"

async function getTasks() {
  return TaskModel.getAllTasks()
}

async function getTaskById(params) {
  let id = parseInt(params.id as string, 10);
  return TaskModel.getTaskById(id)
}

async function createTask(taskData) {
  return TaskModel.createTask(taskData)
}

async function upateTask(params, taskData) {
  let id = parseInt(params.id as string, 10);
  return TaskModel.upateTask(id, taskData);
}

async function deleteTask(params) {
  let id = parseInt(params.id as string, 10);
  return TaskModel.deleteTask(id);
}


export {
  getTasks,
  getTaskById,
  createTask,
  upateTask,
  deleteTask
}