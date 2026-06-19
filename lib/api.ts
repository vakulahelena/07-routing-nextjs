import axios from "axios";
import type { NewNoteBody, Note } from "../types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const API_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const ENDPOINTS = { NOTES: "/notes" };

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export const fetchNotes = async (
  searchQuery: string,
  page: number,
): Promise<FetchNotesResponse> => {
  const { data } = await api.get<FetchNotesResponse>(ENDPOINTS.NOTES, {
    params: {
      page,
      perPage: 12,
      search: searchQuery || undefined,
    },
  });
  return data;
};

export const createNote = async (newNote: NewNoteBody): Promise<Note> => {
  const { data } = await api.post<Note>(ENDPOINTS.NOTES, newNote);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`${ENDPOINTS.NOTES}/${id}`);
  return data;
};

export const fetchNoteById = async (id: string) => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};
