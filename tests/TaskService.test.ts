import request from "supertest";

import app from "../src/app";
import db from "../src/db/setup"
import pool from "../src/db/connection";
import * as TaskModel from "../src/models/TaskModel";

const req = request(app);

afterAll(() => {
  pool.end();
});

describe('GET /task', () => {
  beforeEach(async () => {
    await db.tearDownDB();
    await db.setupDB();
  });

  test("it should return task details", async () => {
    let taskData = {
      "title": "task-1",
      "details": "this is test task"
    }

    await TaskModel.createTask(taskData)

    const response = await req.get('/task')
      .expect('Content-Type', /json/)
      .expect(200)

    let actualData = response.body[0]
    expect(taskData.title).toBe(actualData.title)
    expect(taskData.details).toBe(actualData.details)

    
  });

  test("it should return 0 task with message", async () => {
    const response = await req.get('/task')
      .expect('Content-Type', /json/)
      .expect(200)

    let actualData = response.body
    expect("success").toBe(actualData.status)
    expect("there are no tasks at the moment").toBe(actualData.message)
  });
});

describe('POST /task', () => {
  beforeEach(async () => {
    await db.tearDownDB();
    await db.setupDB();
  });

  test("it should create task", async () => {
    let taskData = {
      "title": "task-1",
      "details": "this is test task"
    }

    const response = await req.post('/task')
      .send(taskData)
      .expect('Content-Type', /json/)
      .expect(200)

    let actualData = response.body
    expect(taskData.title).toBe(actualData.title)
    expect(taskData.details).toBe(actualData.details)
  });

  test("it should return error while create task", async () => {
    let taskData = {
      "details": "this is test task"
    }

    await req.post('/task')
      .send(taskData)
      .expect(400)
  });
});


describe('PUT /task/:id', () => {
  beforeEach(async () => {
    await db.tearDownDB();
    await db.setupDB();
  });

  test("it should update task", async () => {
    let taskData = {
      "title": "task-1",
      "details": "this is test task"
    }

    await TaskModel.createTask(taskData)

    let updatedTaskData = {
      "title": "task-2",
      "details": "this is test task"
    }

    const response = await req.put('/task/1')
      .send(updatedTaskData)
      .expect('Content-Type', /json/)
      .expect(200)

    let actualData = response.body

    expect(updatedTaskData.title).toBe(actualData.title)
    expect(taskData.details).toBe(actualData.details)
    expect(actualData.created).not.toBe(actualData.details)
  });
});

describe('DELETE /task/:id', () => {
  beforeEach(async () => {
    await db.tearDownDB();
    await db.setupDB();
  });

  test("it should delete task", async () => {
    let taskData = {
      "title": "task-1",
      "details": "this is test task"
    }

    await TaskModel.createTask(taskData)

    const response = await req.delete('/task/1')
      .expect(200)

    let actualData = response.body
    expect("task deleted").toBe(actualData.message)
    expect(1).toBe(actualData.data.id)
  });

  test("it should not task", async () => {
    await req.delete('/task/1')
      .expect(400)
  });
});