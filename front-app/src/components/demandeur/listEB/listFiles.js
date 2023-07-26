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

  const [files, setFiles] = useState(initialFiles);
  const [updatedFiles, setUpdatedFiles] = useState([]);

  const handleFileChange = (id, file) => {
    const updatedFile = { id, content: file };
    setUpdatedFiles((prevUpdatedFiles) => [
      ...prevUpdatedFiles.filter((file) => file.id !== id),
      updatedFile,
    ]);
  };

  const handleUpdate = () => {
    // Do something with the updatedFiles array (e.g., send it to the server)
    console.log('Updated Files:', updatedFiles);
    // Reset the updatedFiles array after handling the update
    setUpdatedFiles([]);
  };

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

export default ListFiles;
