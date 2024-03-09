// FilterDropdown.js
import React from 'react';
import './FilterDropdown.css';

const FilterDropdown = ({ value, onChange }) => {
  return (
    <select className="filter-dropdown" value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="all">All</option>
      <option value="To Do">To Do</option>
      <option value="In Progress">In Progress</option>
      <option value="Done">Done</option>
    </select>
  );
};

export default FilterDropdown;
