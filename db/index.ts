import {enablePromise, openDatabase} from 'react-native-sqlite-storage';
import * as exerciseTable from './exercises';
import * as workoutPlansTable from './workoutPlans';

enablePromise(true);

const getDBConnection = async () => {
  const db = await openDatabase({
    name: 'workout-journal.db',
    location: 'default',
  });

  await exerciseTable.createTable(db);
  await workoutPlansTable.createTables(db);

  return db;
};

export {getDBConnection, exerciseTable, workoutPlansTable};
