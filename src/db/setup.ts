import pool from "./connection";

async function setupDB() {
  const client = await pool.connect();
  try {
    const tasksCreateQuery = `CREATE TABLE IF NOT EXISTS tasks
      (
        id SERIAL PRIMARY KEY, 
        title VARCHAR(100) NOT NULL, 
        details VARCHAR(300),
        created timestamp NOT NULL DEFAULT NOW(),
        updated timestamp NOT NULL DEFAULT NOW()
      )`;
    await client.query(tasksCreateQuery);
    console.log("Task Table Created");

    const taskListCreateQuery = `CREATE TABLE IF NOT EXISTS task_list 
      ( 
        id SERIAL PRIMARY KEY, 
        title VARCHAR(100) NOT NULL, 
        created timestamp NOT NULL DEFAULT NOW(),
        updated timestamp NOT NULL DEFAULT NOW()
      )`;
    await client.query(taskListCreateQuery);
    console.log("Task List Table Created");

    const taskMappingCreateQuery = `CREATE TABLE IF NOT EXISTS task_mapping
      (
        id SERIAL PRIMARY KEY, 
        task_id INTEGER REFERENCES tasks(id) ON DELETE CASCADE,
        task_list_id INTEGER REFERENCES task_list(id) ON DELETE CASCADE,
        created timestamp NOT NULL DEFAULT NOW()
      )`;
    await client.query(taskMappingCreateQuery);
    console.log("Task Mapping Table Created");

    const updateTriggerFunc = `CREATE OR REPLACE FUNCTION trigger_set_timestamp()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;`;
    await client.query(updateTriggerFunc);
    console.log("Update Trigger Function Created");

    const createTriggerOnTasks = `CREATE OR REPLACE TRIGGER task_timestamp
      BEFORE UPDATE ON tasks
      FOR EACH ROW
      EXECUTE PROCEDURE trigger_set_timestamp();`
    await client.query(createTriggerOnTasks);
    console.log("Trigger On Tasks Created");

    const createTriggerOnTaskList = `CREATE OR REPLACE TRIGGER task_list_timestamp
      BEFORE UPDATE ON task_list
      FOR EACH ROW
      EXECUTE PROCEDURE trigger_set_timestamp();`
    await client.query(createTriggerOnTaskList);
    console.log("Trigger On Task List Created");
  } catch (err) {
    console.log(err);
  } finally {
    client.release();  
  }
};

async function tearDownDB() {
  const client = await pool.connect();
  try{
    const taskMappingDropQuery = "DROP TABLE IF EXISTS task_mapping";
    await client.query(taskMappingDropQuery);
    console.log("Task Mapping Table Dropped");

    const taskListDropQuery = "DROP TABLE IF EXISTS task_list";
    await client.query(taskListDropQuery);
    console.log("Task List Table Dropped");

    const tasksDropQuery = "DROP TABLE IF EXISTS tasks";
    await client.query(tasksDropQuery);
    console.log("Task Table Dropped");

    const dropTriggerFunc = "DROP FUNCTION IF EXISTS trigger_set_timestamp()";
    await client.query(dropTriggerFunc);
    console.log("Trigger Func Dropped");

    const dropTaskTrigger = "DROP TRIGGER IF EXISTS task_timestamp ON tasks";
    await client.query(dropTaskTrigger);
    console.log("Trigger On Tasks Dropped");

    const dropTaskListTrigger = "DROP TRIGGER IF EXISTS task_list_timestamp ON task_list";
    await client.query(dropTaskListTrigger);
    console.log("Trigger On TaskList Dropped");
  } catch (err) {
    console.log(err);
  } finally {
    client.release();  
  }
};

export default {
  setupDB,
  tearDownDB,
};

require('make-runnable');