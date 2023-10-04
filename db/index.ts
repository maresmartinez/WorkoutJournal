import {enablePromise, openDatabase} from 'react-native-sqlite-storage';
import * as exerciseTable from './exercises';

enablePromise(true);

const getDBConnection = async () => {
  const db = await openDatabase({
    name: 'workout-journal.db',
    location: 'default',
  });

  await exerciseTable.createTable(db);

  return db;
};

export {getDBConnection, exerciseTable};
