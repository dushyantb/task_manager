import * as TaskService from '../services/TaskService'

async function getTasks (req, res) {
  const result: any = await TaskService.getTasks()

  if (result.status == 'error') {
    res.status(400).send(result.message)
  } else {
    res.send(result)
  }
}

async function getTaskById (req, res) {
  const result = await TaskService.getTaskById(req.params)

  if (result.status == 'error') {
    res.status(400).send(result.message)
  } else {
    res.send(result)
  }
}

async function createTask (req, res) {
  const result = await TaskService.createTask(req.body)

  if (result.status == 'error') {
    res.status(400).send(result.message)
  } else {
    res.send(result)
  }
}

async function upateTask (req, res) {
  const result = await TaskService.upateTask(req.params, req.body)

  if (result.status == 'error') {
    res.status(400).send(result.message)
  } else {
    res.send(result)
  }
}

async function deleteTask (req, res) {
  const result = await TaskService.deleteTask(req.params)

  if (result.status == 'error') {
    res.status(400).send(result.message)
  } else {
    res.send(result)
  }
}

export {
  getTasks,
  getTaskById,
  createTask,
  upateTask,
  deleteTask
}
