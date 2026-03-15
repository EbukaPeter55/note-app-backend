import { CreateNoteDTO, Note, UpdateNoteDTO } from './note.types'
import * as noteRepository from './note.repository'

export const createNote = async (data: CreateNoteDTO): Promise<Note> => {
  return noteRepository.createNote(data)
}

export const getAllNotes = async () => {
  return noteRepository.getAllNotes()
}

export const getNoteById = async (id: number) => {
  return noteRepository.getNoteById(id)
}

export const updateNote = async (id: number, data: UpdateNoteDTO) => {
  return noteRepository.updateNote(id, data)
}

export const deleteNote = async (id: number) => {
  return noteRepository.deleteNote(id)
}