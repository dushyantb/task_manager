import pool from './connection';

async function exec(queryString: string, params: any) {
  const client = await pool.connect();
  try {
    let res = await client.query(queryString, params)
    return res;
  } catch(err) {
    console.log(err)
    client.release();
    throw new Error('Error In Query Exection');
  } finally {
    client.release();  
  }
}

export default exec;