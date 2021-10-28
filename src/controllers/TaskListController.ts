import * as TaskListService from '../services/TaskListService'

async function getTaskLists (req, res) {
  const result: any = await TaskListService.getTaskLists()

  if (result.status == 'error') {
    res.status(401).send(result.message)
  } else {
    res.send(result)
  }
}

async function getTaskListById (req, res) {
  const result = await TaskListService.getTaskListById(req.params)

  if (result.status == 'error') {
    res.status(401).send(result.message)
  } else {
    res.send(result)
  }
}

async function createTaskList (req, res) {
  const result = await TaskListService.createTaskList(req.body)

  if (result.status == 'error') {
    res.status(400).send(result.message)
  } else {
    res.send(result)
  }
}

async function upateTaskList (req, res) {
  const result = await TaskListService.upateTaskList(req.params, req.body)

  if (result.status == 'error') {
    res.status(400).send(result.message)
  } else {
    res.send(result)
  }
}

async function deleteTaskList (req, res) {
  const result = await TaskListService.deleteTaskList(req.params)

  if (result.status == 'error') {
    res.status(400).send(result.message)
  } else {
    res.send(result)
  }
}

async function addTasksToList (req, res) {
  const result = await TaskListService.addTasksToList(req.params, req.body)

  if (result.status == 'error') {
    res.status(400).send(result.message)
  } else {
    res.send(result)
  }
}

async function removeTasksFromList (req, res) {
  const result = await TaskListService.removeTasksFromList(req.params, req.body)

  if (result.status == 'error') {
    res.status(400).send(result.message)
  } else {
    res.send(result)
  }
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
