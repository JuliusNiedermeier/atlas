import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const workoutTable = sqliteTable("workout", {
  id: int("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
});

export const workoutTemplateTable = sqliteTable("workout_template", {
  id: int("id").primaryKey({ autoIncrement: true }),
  workoutId: int("workout_id")
    .notNull()
    .unique()
    .references(() => workoutTable.id),
});

export const workoutLogTable = sqliteTable("workout_log", {
  id: int("id").primaryKey({ autoIncrement: true }),
  workoutId: int("workout_id")
    .notNull()
    .unique()
    .references(() => workoutTable.id),
  note: text("note"),
  startedAt: int("started_at").notNull(),
  completedAt: int("completed_at"),
});

export const exerciseTable = sqliteTable("exercise", {
  id: int("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
});

export const workoutExerciseTable = sqliteTable("workout_exercise", {
  id: int("id").primaryKey({ autoIncrement: true }),
  workoutId: int("workout_id")
    .notNull()
    .references(() => workoutTable.id),
  exerciseId: int("exercise_id")
    .notNull()
    .references(() => exerciseTable.id),
  sortOrder: int("sort_order").notNull().unique(), // Must be decimal
});

export const workoutExerciseSetTable = sqliteTable("workout_exercise_set", {
  id: int("id").primaryKey({ autoIncrement: true }),
  workoutExerciseId: int("workout_exercise_id")
    .notNull()
    .references(() => workoutExerciseTable.id),
  sortOrder: int("sort_order").notNull().unique(), // Must be decimal
  type: text("type").notNull().$type<"warmup" | "work">(),
  description: text("description"),
  pauseSeconds: int("pause_seconds").notNull(),
  workoutExerciseSetLogId: int("workout_exercise_set_log_id")
    .unique()
    .references(() => workoutExerciseSetLogTable.id),
});

export const workoutExerciseSetLogTable = sqliteTable(
  "workout_exercise_set_log",
  {
    id: int("id").primaryKey({ autoIncrement: true }),
    note: text("note"),
    weight: int("weight"),
    repetitions: int("repetitions"),
    completedAt: int("completed_at"),
  }
);

export const workoutRelations = relations(workoutTable, ({ one, many }) => ({
  template: one(workoutTemplateTable, {
    fields: [workoutTable.id],
    references: [workoutTemplateTable.workoutId],
  }),
  log: one(workoutLogTable, {
    fields: [workoutTable.id],
    references: [workoutLogTable.workoutId],
  }),
  workoutExercises: many(workoutExerciseTable),
}));

export const workoutTemplateRelations = relations(
  workoutTemplateTable,
  ({ one }) => ({
    workout: one(workoutTable, {
      fields: [workoutTemplateTable.workoutId],
      references: [workoutTable.id],
    }),
  })
);

export const workoutLogRelations = relations(workoutLogTable, ({ one }) => ({
  workout: one(workoutTable, {
    fields: [workoutLogTable.workoutId],
    references: [workoutTable.id],
  }),
}));

export const exerciseRelations = relations(exerciseTable, ({ many }) => ({
  workoutExercises: many(workoutExerciseTable),
}));

export const workoutExerciseRelations = relations(
  workoutExerciseTable,
  ({ one, many }) => ({
    workout: one(workoutTable, {
      fields: [workoutExerciseTable.workoutId],
      references: [workoutTable.id],
    }),
    exercise: one(exerciseTable, {
      fields: [workoutExerciseTable.exerciseId],
      references: [exerciseTable.id],
    }),
    sets: many(workoutExerciseSetTable),
  })
);

export const workoutExerciseSetRelations = relations(
  workoutExerciseSetTable,
  ({ one }) => ({
    workoutExercise: one(workoutExerciseTable, {
      fields: [workoutExerciseSetTable.workoutExerciseId],
      references: [workoutExerciseTable.id],
    }),
    workoutExerciseSetLogTable: one(workoutExerciseSetLogTable, {
      fields: [workoutExerciseSetTable.workoutExerciseSetLogId],
      references: [workoutExerciseSetLogTable.id],
    }),
  })
);

export const workoutExerciseSetLogRelations = relations(
  workoutExerciseSetLogTable,
  ({ one }) => ({
    workoutExerciseSet: one(workoutExerciseSetTable, {
      fields: [workoutExerciseSetLogTable.id],
      references: [workoutExerciseSetTable.workoutExerciseSetLogId],
    }),
  })
);
