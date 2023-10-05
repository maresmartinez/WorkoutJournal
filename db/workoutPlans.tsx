import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {WorkoutRound, WorkoutPlan} from '../models';
import {exerciseTable} from '.';

const workoutPlansTable = 'workout_plans';
const workoutRoundsTable = 'workout_rounds';
const workoutPlanRoundsTable = 'workout_plan_rounds';

const createTables = async (db: SQLiteDatabase) => {
  // create table if not exists
  const createWorkoutPlansTableQuery = `CREATE TABLE IF NOT EXISTS ${workoutPlansTable} (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      notes TEXT
    );`;

  const createWorkoutRoundsTableQuery = `CREATE TABLE IF NOT EXISTS ${workoutRoundsTable} (
      id INTEGER PRIMARY KEY,
       exercise_id INTEGERY NOT NULL ,
       sets INTEGER NOT NULL,
       reps_per_set INTEGER NOT NULL,
       
       CONSTRAINT fk_exercise_id FOREIGN KEY (exercise_id) REFERENCES exercises(id)
    );`;

  const createWorkoutPlanRoundsTableQuery = `CREATE TABLE IF NOT EXISTS ${workoutPlanRoundsTable} (
      id INTEGER PRIMARY KEY,
      workout_plan_id INTEGER NOT NULL,
      workout_round_id INTEGER NOT NULL,
      
      CONSTRAINT fk_workout_plan_id FOREIGN KEY (workout_plan_id) REFERENCES workout_plans(id)
      CONSTRAINT fk_workout_round_id FOREIGN KEY (workout_round_id) REFERENCES workout_rounds(id)
    );`;

  await db.executeSql(createWorkoutPlansTableQuery);
  await db.executeSql(createWorkoutRoundsTableQuery);
  await db.executeSql(createWorkoutPlanRoundsTableQuery);
};

const saveWorkoutRound = async (db: SQLiteDatabase, round: WorkoutRound) => {
  const insertQuery = `INSERT INTO ${workoutRoundsTable} (exercise_id, sets, reps_per_set) VALUES (
    ${round.exercise.id},
    ${round.sets},
    ${round.repsPerSet}
  );`;

  return db.executeSql(insertQuery);
};

const saveWorkoutPlan = async (db: SQLiteDatabase, plan: WorkoutPlan) => {
  const insertQuery = `INSERT INTO ${workoutPlansTable} (name, notes) VALUES ('${
    plan.name
  }', ${plan.notes ?? 'null'});`;

  return db.executeSql(insertQuery);
};

const saveWorkoutPlanRound = async (
  db: SQLiteDatabase,
  planId: number,
  roundId: number,
) => {
  const insertQuery = `INSERT INTO ${workoutPlanRoundsTable} (workout_plan_id, workout_round_id)
    VALUES (${planId}, ${roundId}
  )`;

  return db.executeSql(insertQuery);
};

const saveManyPlans = async (db: SQLiteDatabase, plans: WorkoutPlan[]) => {
  plans.forEach(async plan => {
    const plansResult = await saveWorkoutPlan(db, plan);
    const planId = plansResult[0].insertId;

    plan.rounds.forEach(async round => {
      const roundResult = await saveWorkoutRound(db, round);
      const roundId = roundResult[0].insertId;

      await saveWorkoutPlanRound(db, planId, roundId);
    });
  });
};

const getWorkoutRoundsByPlanId = async (db: SQLiteDatabase, planId: number) => {
  try {
    const rounds: WorkoutRound[] = [];
    const results =
      await db.executeSql(`SELECT wr.id as id, sets, reps_per_set, exercise_id
      FROM ${workoutRoundsTable} wr
      INNER JOIN ${workoutPlanRoundsTable} wpr
      ON wr.id = wpr.workout_round_id
      WHERE workout_plan_id = ${planId};`);

    await Promise.all(
      results.map(async result => {
        for (let index = 0; index < result.rows.length; index++) {
          const dbRound = result.rows.item(index);

          const exercise = await exerciseTable.getExerciseById(
            db,
            dbRound.exercise_id,
          );

          rounds.push({
            id: dbRound.id,
            exercise: exercise[0],
            sets: dbRound.sets,
            repsPerSet: dbRound.reps_per_set,
          });
        }
      }),
    );

    return rounds;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get rounds.');
  }
};

const getAllPlans = async (db: SQLiteDatabase) => {
  try {
    const plans: WorkoutPlan[] = [];
    const results = await db.executeSql(`SELECT * FROM ${workoutPlansTable};`);

    await Promise.all(
      results.map(async result => {
        for (let index = 0; index < result.rows.length; index++) {
          const plan = result.rows.item(index);

          const rounds = await getWorkoutRoundsByPlanId(db, plan.id);

          plan.rounds = rounds;

          plans.push(plan);
        }
      }),
    );

    return plans;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get plans.');
  }
};

// const deleteItem = async (db: SQLiteDatabase, id: number) => {
//   const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
//   await db.executeSql(deleteQuery);
// };

// const deleteTable = async (db: SQLiteDatabase) => {
//   const query = `drop table ${tableName}`;

//   await db.executeSql(query);
// };

export {
  createTables,
  saveManyPlans,
  saveWorkoutRound,
  saveWorkoutPlan,
  saveWorkoutPlanRound,
  getWorkoutRoundsByPlanId,
  getAllPlans,
};
