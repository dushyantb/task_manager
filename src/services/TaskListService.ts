import * as TaskListModel from "../models/TaskListModel"

async function getTaskLists() {
  return TaskListModel.getAllTaskLists()
}

async function getTaskListById(params) {
  let id = parseInt(params.id as string, 10);
  return TaskListModel.getTaskListById(id)
}

async function createTaskList(taskListData) {
  return TaskListModel.createTaskList(taskListData)
}

async function upateTaskList(params, taskListData) {
  let id = parseInt(params.id as string, 10);
  return TaskListModel.upateTaskList(id, taskListData);
}

async function deleteTaskList(params) {
  let id = parseInt(params.id as string, 10);
  return TaskListModel.deleteTaskList(id);
}

async function addTasksToList(params, taskList) {
  let id = parseInt(params.id as string, 10);
  return TaskListModel.addTasksToList(id, taskList.tasks);
}

async function removeTasksFromList(params, taskList) {
  let id = parseInt(params.id as string, 10);
  return TaskListModel.removeTasksFromList(id, taskList.tasks);
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