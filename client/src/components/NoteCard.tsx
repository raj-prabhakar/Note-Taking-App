import React from 'react';
import axios from 'axios';
import { Note } from '../pages/Dashboard';

interface NoteCardProps {
    note: Note;
    onClick: () => void;
    refreshNotes: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onClick, refreshNotes }) => {
    const token = localStorage.getItem('token');

    const copyToClipboard = () => {
        navigator.clipboard.writeText(note.content);
        alert('Note content copied to clipboard!');
    };

    const BACKEND_URL = '/api';

    const deleteNote = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await axios.delete(`${BACKEND_URL}/notes/${note._id}`, {
                headers: { Authorization: token as string }
            });
            refreshNotes();
        } catch (error) {
            alert('Error deleting note');
        }
    };

    const renameNote = async (e: React.MouseEvent) => {
        e.stopPropagation();
        const newTitle = prompt('Enter new title:', note.title);
        if (newTitle) {
            try {
                await axios.put(
                    `${BACKEND_URL}/notes/${note._id}`,
                    { title: newTitle },
                    { headers: { Authorization: token as string } }
                );
                refreshNotes();
            } catch (error) {
                alert('Error renaming note');
            }
        }
    };

    return (
        <div onClick={onClick} className="border p-4 rounded shadow-md cursor-pointer hover:shadow-lg transition">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">{note.title}</h2>
                <div className="space-x-2">
                    <button onClick={copyToClipboard} className="text-sm bg-gray-200 p-1 rounded">
                        Copy
                    </button>
                    <button onClick={renameNote} className="text-sm bg-gray-200 p-1 rounded">
                        Rename
                    </button>
                    <button onClick={deleteNote} className="text-sm bg-red-300 p-1 rounded">
                        Delete
                    </button>
                </div>
            </div>
            <p>{note.content.substring(0, 100)}...</p>
        </div>
    );
};

export default NoteCard;
