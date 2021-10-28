import express from "express";
const router = express.Router();

import taskRoutes from "./TaskRoute";

router.use('/task', taskRoutes)

export default router;
