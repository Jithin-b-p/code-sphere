import { Router } from 'express'
import {
  createSubmissionHandler,
  getSubmissionHandler,
  listSubmissionForProblemHandler,
} from './submissions.controller'
import { requireAuth } from '../auth/auth.middleware'

const router = Router()

router.post('/', requireAuth, createSubmissionHandler)
router.get('/:id', requireAuth, getSubmissionHandler)
router.get('/problem/:problemId', requireAuth, listSubmissionForProblemHandler)

export default router
