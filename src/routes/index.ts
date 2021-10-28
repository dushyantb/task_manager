import express from "express";
const router = express.Router();

import taskRoutes from "./TaskRoute";
import taskListRouts from "./TaskListRoute";

router.use('/task', taskRoutes)
router.use('/tasklist', taskListRouts)

export default router;
