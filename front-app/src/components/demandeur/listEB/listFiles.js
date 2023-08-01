import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ListFiles = (props) => {
    const location = useLocation();
    const {
        initialFiles
    } = location.state;
//   const initialFiles1 = [
//     { id: 1, name: 'file1.txt', content: null },
//     { id: 2, name: 'file2.txt', content: null },
//     { id: 3, name: 'file3.txt', content: null },
//   ];

    const toggleFilterDropdown = () => {
        setShowFilterDropdown((prevShow) => !prevShow);
    };

  const handleFileChange = (id, file) => {
    const updatedFile = { id, content: file };
    setUpdatedFiles((prevUpdatedFiles) => [
      ...prevUpdatedFiles.filter((file) => file.id !== id),
      updatedFile,
    ]);
  };

    const handleFilterRows = () => {
        // Your filtering logic here based on filters
        // You can apply the filters to the rows and update the state accordingly
        // For now, let's just log the filters
        console.log(filters);
    };

    // Sorting Logic
    let sortedRows = selectedRows.slice();
    if (sortBy) {
        sortedRows.sort((a, b) => {
            const aValue = a[sortBy];
            const bValue = b[sortBy];
            if (sortAsc) {
                return aValue.localeCompare(bValue);
            } else {
                return bValue.localeCompare(aValue);
            }
        });
    }

    // Filtering Logic
    Object.keys(filters).forEach((column) => {
        const filterValue = filters[column].toLowerCase();
        sortedRows = sortedRows.filter((row) => row[column].toLowerCase().includes(filterValue));
    });

  return (
    <div>
      <h2>Update Files</h2>
      {files.map((file) => (
        <div key={file.id}>
          <h3>{file.name}</h3>
          <input
            type="file"
            onChange={(e) => handleFileChange(file.id, e.target.files[0])}
          />
        </div>
      ))}
      <button onClick={handleUpdate}>Confirm Update</button>
    </div>
  );
}

