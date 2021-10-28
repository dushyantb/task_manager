import exec from '../db/query'

async function getAllTasks () {
  const queryStr = 'SELECT * FROM tasks ORDER BY id DESC'
  try {
    const { rows } = await exec(queryStr, null)
    const dbResponse = rows

    if (dbResponse.length == 0) {
      return {
        status: 'success',
        message: 'there are no tasks at the moment'
      }
    }

    for (let i = 0; i < dbResponse.length; i++) {
      const taskQueryStr = `SELECT 
          t.id,
          t.title
        FROM task_list t, 
          task_mapping m 
        WHERE 
          m.task_id=${dbResponse[i].id}
          AND m.task_list_id = t.id`

      const { rows } = await exec(taskQueryStr, null)

      const res = rows
      dbResponse[i].taskList = res
    }

    return dbResponse
  } catch (err) {
    console.log(err)
    return {
      status: 'error',
      message: 'Error while fetching the tasks'
    }
  }
}

async function getTaskById (taskId) {
  const queryStr = 'SELECT * FROM tasks WHERE id=$1'
  const values = [
    taskId
  ]

  try {
    const { rows } = await exec(queryStr, values)
    const dbResponse = rows

    if (dbResponse.length == 0) {
      return {
        status: 'success',
        message: 'no task with specified id'
      }
    }

    for (let i = 0; i < dbResponse.length; i++) {
      const taskQueryStr = `SELECT 
          t.id,
          t.title
        FROM task_list t, 
          task_mapping m 
        WHERE 
          m.task_id=${dbResponse[i].id}
          AND m.task_list_id = t.id`

      const { rows } = await exec(taskQueryStr, null)

      const res = rows
      dbResponse[i].taskList = res
    }

    return dbResponse[0]
  } catch (err) {
    console.log(err)
    return {
      status: 'error',
      message: 'Error while fetching the task with specified id'
    }
  }
}

async function createTask (taskData) {
  const queryStr = 'INSERT INTO tasks(title, details) VALUES($1, $2) returning *'
  const values = [
    taskData.title,
    taskData.details
  ]

  try {
    const { rows } = await exec(queryStr, values)
    const dbResponse = rows

    if (dbResponse.length == 0) {
      throw new Error('Something went wrong while creating task')
    }
    return dbResponse[0]
  } catch (err) {
    console.log(err)
    return {
      status: 'error',
      message: 'Error while creating the task'
    }
  }
}

async function upateTask (taskId, taskData) {
  const queryStr = 'UPDATE tasks set title=$2, details=$3 WHERE id=$1 returning *'
  const values = [
    taskId,
    taskData.title,
    taskData.details
  ]

  try {
    const { rows } = await exec(queryStr, values)
    const dbResponse = rows

    if (dbResponse.length == 0) {
      throw new Error('Something went wrong while updating task')
    }
    return dbResponse[0]
  } catch (err) {
    console.log(err)
    return {
      status: 'error',
      message: 'Error while updating the task'
    }
  }
}

async function deleteTask (taskId) {
  const queryStr = 'DELETE FROM tasks WHERE id=$1 returning *'
  const values = [
    taskId
  ]

  try {
    const { rows } = await exec(queryStr, values)
    const dbResponse = rows

    if (dbResponse.length == 0) {
      throw new Error('Something went wrong while deleting task')
    }
    return {
      message: 'task deleted',
      data: dbResponse[0]
    }
  } catch (err) {
    console.log(err)
    return {
      status: 'error',
      message: 'Error while deleting the task with specified id'
    }
  }
}

export {
  getAllTasks,
  getTaskById,
  createTask,
  upateTask,
  deleteTask
}
