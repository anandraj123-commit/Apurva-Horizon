import React, { useState } from 'react';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');

  function handleFile(e) {
    const selectedFile = e.target.files[0];
    const fileSizeInKB = selectedFile ? selectedFile.size / 1024 : 0;
    const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/svg+xml'];

    if (selectedFile) {
      if (imageTypes.includes(selectedFile.type)) {
        if (fileSizeInKB > 31) {
          setError('Image files must be 25KB or less.');
          setFile(null);
          setPreview(null);
          return;
        }
      }

      if (fileSizeInKB <= 100) {
        setFile(selectedFile);
        if (imageTypes.includes(selectedFile.type)) {
          setPreview(URL.createObjectURL(selectedFile));
        }
        setError('');
      } else {
        setError('File must be 100KB or less.');
        setFile(null);
        setPreview(null);
      }
    }
  }

  function uploadFileToServer() {
    if (!file) {
      setError('No file selected to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch('/upload', { 
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('File uploaded successfully:', data);
        alert('File uploaded successfully!');
      })
      .catch(error => {
        console.error('Error uploading file:', error);
        setError('Failed to upload file. Please try again.');
      });
  }

  return (
    <form action="/upload" method="POST" enctype="multipart/form-data">
      <input type="file" name="filedata" onChange={handleFile}  />
      {preview && <img src={preview} alt="Preview" style={{ width: '200px', marginTop: '10px' }} />}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submmit" onChange={uploadFileToServer} disabled={!file}>
        Upload
      </button>
    </form>
    
  );
}

export default FileUpload;
