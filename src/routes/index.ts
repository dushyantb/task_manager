import express from 'express'

import taskRoutes from './TaskRoute'
import taskListRouts from './TaskListRoute'
const router = express.Router()

router.use('/task', taskRoutes)
router.use('/tasklist', taskListRouts)

export default router
