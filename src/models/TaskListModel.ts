import { chownSync } from 'fs'
import format from 'pg-format'

import exec from '../db/query'

async function getAllTaskLists () {
  const queryStr = 'SELECT * FROM task_list ORDER BY id DESC'
  try {
    const { rows } = await exec(queryStr, null)
    const dbResponse = rows

    if (dbResponse.length == 0) {
      return {
        status: 'success',
        message: 'there are no task lists at the moment'
      }
    }

    for (let i = 0; i < dbResponse.length; i++) {
      const taskQueryStr = `SELECT 
          t.id,
          t.title, 
          t.details 
        FROM tasks t, 
          task_mapping m 
        WHERE 
          m.task_list_id=${dbResponse[i].id}
          AND m.task_id = t.id`

      const { rows } = await exec(taskQueryStr, null)

      const res = rows
      dbResponse[i].tasks = res
    }

    return dbResponse
  } catch (err) {
    console.log(err)
    return {
      status: 'error',
      message: 'Error while fetching the task lists'
    }
  }
}

async function getTaskListById (taskListId) {
  try {
    const queryStr = 'SELECT * FROM task_list WHERE id=$1'
    const values = [
      taskListId
    ]

    const { rows } = await exec(queryStr, values)
    const dbResponse = rows

    if (dbResponse.length == 0) {
      return {
        status: 'success',
        message: 'no task list with specified id'
      }
    }

    for (let i = 0; i < dbResponse.length; i++) {
      const taskQueryStr = `SELECT 
          t.id,
          t.title, 
          t.details 
        FROM tasks t, 
          task_mapping m 
        WHERE 
          m.task_list_id=${dbResponse[i].id}
          AND m.task_id = t.id`

      const { rows } = await exec(taskQueryStr, null)

      const res = rows
      dbResponse[i].tasks = res
    }

    return dbResponse[0]
  } catch (err) {
    console.log(err)
    return {
      status: 'error',
      message: 'Error while fetching the task list with specified id'
    }
  }
}

async function createTaskList (taskListData) {
  const queryStr = 'INSERT INTO task_list(title) VALUES($1) returning *'
  const values = [
    taskListData.title
  ]

  try {
    const { rows } = await exec(queryStr, values)
    const dbResponse = rows

    if (dbResponse[0] === undefined) {
      throw new Error('Something went wrong while creating task list')
    }
    return dbResponse[0]
  } catch (err) {
    console.log(err)
    return {
      status: 'error',
      message: 'Error while creating the task list'
    }
  }
}

async function upateTaskList (taskListId, taskListData) {
  const queryStr = 'UPDATE task_list set title=$2 WHERE id=$1 returning *'
  const values = [
    taskListId,
    taskListData.title
  ]

  try {
    const { rows } = await exec(queryStr, values)
    const dbResponse = rows

    if (dbResponse[0] === undefined) {
      throw new Error('Something went wrong while updating task list')
    }
    return dbResponse[0]
  } catch (err) {
    console.log(err)
    return {
      status: 'error',
      message: 'Error while updating the task list'
    }
  }
}

async function deleteTaskList (taskListId) {
  const queryStr = 'DELETE FROM task_list WHERE id=$1 returning *'
  const values = [
    taskListId
  ]

  try {
    const { rows } = await exec(queryStr, values)
    const dbResponse = rows

    if (dbResponse[0] === undefined) {
      throw new Error('Something went wrong while deleting task list')
    }
    return {
      message: 'task deleted',
      data: dbResponse[0]
    }
  } catch (err) {
    console.log(err)
    return {
      status: 'error',
      message: 'Error while deleting the task list with specified id'
    }
  }
}

async function addTasksToList (taskListId, taskList) {
  const values = []
  taskList.forEach(element => {
    const temp = []
    temp.push(taskListId)
    temp.push(element)

    values.push(temp)
  })

  const queryStr = format('INSERT INTO task_mapping(task_list_id, task_id) VALUES %L returning *', values)

  try {
    const { rows } = await exec(queryStr, null)
    const dbResponse = rows

    if (dbResponse[0] === undefined) {
      throw new Error('Something went wrong while adding tasks to list')
    }
    return {
      data: dbResponse[0]
    }
  } catch (err) {
    console.log(err)
    return {
      status: 'error',
      message: 'Error while adding tasks to list'
    }
  }
}

async function removeTasksFromList (taskListId, taskList) {
  try {
    const queryStr = format('DELETE FROM task_mapping WHERE task_list_id= %L AND task_id IN (%L) returning *', taskListId, taskList)

    const { rows } = await exec(queryStr, null)
    const dbResponse = rows

    if (dbResponse.length == 0) {
      throw new Error('No mapping found to delete')
    }
    return {
      message: 'mapping deleted'
    }
  } catch (err) {
    console.log(err)
    return {
      status: 'error',
      message: 'No mapping found to delete'
    }
  }
}

export {
  getAllTaskLists,
  getTaskListById,
  createTaskList,
  upateTaskList,
  deleteTaskList,
  addTasksToList,
  removeTasksFromList
}

// INSERT INTO task_mapping(taks_list_id, taks_id) values(2, unnest(array[1]));
