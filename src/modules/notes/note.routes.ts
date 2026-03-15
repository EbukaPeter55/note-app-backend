import { Router } from 'express'
import * as noteController from './note.controller'

const router = Router()

router.post('/', noteController.createNote)
router.get('/', noteController.getAllNotes)
router.get('/:id', noteController.getNoteById)
router.put('/:id', noteController.updateNote)
router.delete('/:id', noteController.deleteNote)

export default router