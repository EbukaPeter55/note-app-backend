CREATE TRIGGER update_notes_updated_at
BEFORE UPDATE ON notes
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();