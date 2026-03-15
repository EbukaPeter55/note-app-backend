import { pool } from "../../config/database";
import { CreateNoteDTO, Note, UpdateNoteDTO } from "./note.types";

export const createNote = async (data: CreateNoteDTO): Promise<Note> => {
  const query = `
    INSERT INTO notes (title, content)
    VALUES ($1, $2)
    RETURNING *
  `;

  const values = [data.title, data.content];

  const result = await pool.query(query, values);

  return result.rows[0];
};

// Get all notes
export const getAllNotes = async (
  page: number,
  limit: number,
  search?: string,
): Promise<Note[]> => {
  const offset = (page - 1) * limit;

  let query = `
    SELECT *
    FROM notes
  `;
  const values: any[] = [];

  if (search) {
    query += ` WHERE title ILIKE $1 OR content ILIKE $1`;
    values.push(`%${search}%`);
  }

  query += ` ORDER BY created_at DESC LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;

  values.push(limit, offset);
  const result = await pool.query(query, values);
  return result.rows;
};

// Get note by id
export const getNoteById = async (id: number): Promise<Note | null> => {
  const result = await pool.query("SELECT * FROM notes WHERE id = $1", [id]);
  return result.rows[0] || null;
};

// Update note
export const updateNote = async (
  id: number,
  data: UpdateNoteDTO,
): Promise<Note | null> => {
  const fields: string[] = [];
  const values: any[] = [];

  let index = 1;

  if (data.title) {
    fields.push(`title = $${index}`);
    values.push(data.title);
    index++;
  }

  if (data.content) {
    fields.push(`content = $${index}`);
    values.push(data.content);
    index++;
  }

  if (fields.length === 0) return getNoteById(id); // nothing to update

  // updated_at timestamp
  fields.push(`updated_at = NOW()`);

  const query = `UPDATE notes SET ${fields.join(", ")} WHERE id = $${index} RETURNING *`;
  values.push(id);

  const result = await pool.query(query, values);
  return result.rows[0] || null;
};

// Delete note
export const deleteNote = async (id: number): Promise<boolean> => {
  const result = await pool.query("DELETE FROM notes WHERE id = $1", [id]);
  return (result.rowCount ?? 0) > 0;
};
