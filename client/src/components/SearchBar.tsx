import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [term, setTerm] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTerm(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <input
            type="text"
            placeholder="Search notes..."
            value={term}
            onChange={handleChange}
            className="border p-2 w-full mb-4"
        />
    );
};

export default SearchBar;
