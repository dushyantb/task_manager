import * as TaskListModel from '../models/TaskListModel'

async function getTaskLists () {
  return await TaskListModel.getAllTaskLists()
}

async function getTaskListById (params) {
  const id = parseInt(params.id as string, 10)
  return await TaskListModel.getTaskListById(id)
}

async function createTaskList (taskListData) {
  return await TaskListModel.createTaskList(taskListData)
}

async function upateTaskList (params, taskListData) {
  const id = parseInt(params.id as string, 10)
  return await TaskListModel.upateTaskList(id, taskListData)
}

async function deleteTaskList (params) {
  const id = parseInt(params.id as string, 10)
  return await TaskListModel.deleteTaskList(id)
}

async function addTasksToList (params, taskList) {
  const id = parseInt(params.id as string, 10)
  return await TaskListModel.addTasksToList(id, taskList.tasks)
}

async function removeTasksFromList (params, taskList) {
  const id = parseInt(params.id as string, 10)
  return await TaskListModel.removeTasksFromList(id, taskList.tasks)
}

export {
  getTaskLists,
  getTaskListById,
  createTaskList,
  upateTaskList,
  deleteTaskList,
  addTasksToList,
  removeTasksFromList
}
