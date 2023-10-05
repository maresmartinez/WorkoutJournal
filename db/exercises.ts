import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {Exercise} from '../models';

const tableName = 'exercises';

const createTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName} (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
    );`;

  await db.executeSql(query);
};

const getExerciseById = async (
  db: SQLiteDatabase,
  exerciseId: number,
): Promise<Exercise[]> => {
  try {
    const exercises: Exercise[] = [];
    const results = await db.executeSql(
      `SELECT * FROM ${tableName} WHERE id = ${exerciseId}`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        exercises.push(result.rows.item(index));
      }
    });
    return exercises;
  } catch (error) {
    console.error(error);
    throw Error(`Failed to get exercise id ${exerciseId}.`);
  }
};

const getAllItems = async (db: SQLiteDatabase): Promise<Exercise[]> => {
  try {
    const exercises: Exercise[] = [];
    const results = await db.executeSql(`SELECT * FROM ${tableName}`);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        exercises.push(result.rows.item(index));
      }
    });
    return exercises;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get exercises.');
  }
};

const saveItem = async (db: SQLiteDatabase, exercise: Exercise) => {
  const insertQuery = `INSERT INTO ${tableName} (name) values ('${exercise.name}'); `;

  return db.executeSql(insertQuery);
};

const saveMany = async (db: SQLiteDatabase, exercises: Exercise[]) => {
  const insertManyQuery =
    `INSERT INTO ${tableName} (name) values  ` +
    exercises.map(e => `('${e.name}')`).join(',');

  return db.executeSql(insertManyQuery);
};

const deleteItem = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
  await db.executeSql(deleteQuery);
};

const deleteTable = async (db: SQLiteDatabase) => {
  const query = `drop table ${tableName}`;

  await db.executeSql(query);
};

export {
  createTable,
  getAllItems,
  saveItem,
  deleteItem,
  deleteTable,
  saveMany,
  getExerciseById,
};
