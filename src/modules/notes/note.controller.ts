import { NextFunction, Request, Response } from "express";
import * as noteService from "./note.service";
import { createNoteSchema, updateNoteSchema } from "./note.validation";

export const createNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = createNoteSchema.parse(req.body);

    const note = await noteService.createNote(validatedData);

    res.status(201).json({
      success: true,
      data: note,
    });
  } catch (error: any) {
    next(error);
  }
};

export const getAllNotes = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const page = Number(_req.query.page) || 1;
    const limit = Number(_req.query.limit) || 10;
    const search = _req.query.search as string | undefined;

    const notes = await noteService.getAllNotes(page, limit, search);
    res.status(200).json({ success: true, page, limit, data: notes });
  } catch (error) {
    next(error);
  }
};

export const getNoteById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const note = await noteService.getNoteById(Number(req.params.id));
    if (!note)
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    res.status(200).json({ success: true, data: note });
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = updateNoteSchema.parse(req.body);
    const note = await noteService.updateNote(
      Number(req.params.id),
      validatedData,
    );
    if (!note)
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    res.status(200).json({ success: true, data: note });
  } catch (error: any) {
    next(error);
  }
};

export const deleteNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deleted = await noteService.deleteNote(Number(req.params.id));
    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    res
      .status(200)
      .json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    next(error);
  }
};
