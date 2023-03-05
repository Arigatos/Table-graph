import React from "react";

const Search = ({ searchTerm, onChange, handleKeyDown }) => {
  return (
    <div className="search d-flex align-items-center justify-content-center">
      <input
        type="text"
        placeholder="Search and press enter . . ."
        value={searchTerm}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Search;
