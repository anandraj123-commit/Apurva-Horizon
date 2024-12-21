import React, { useState } from 'react';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function handleFile(e) {
    const selectedFile = e.target.files[0];
    const fileSizeInKB = selectedFile ? selectedFile.size / 1024 : 0;
    const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    const pdfType = 'application/pdf';
      
    // Clear previous success or error state when a new file is selected
    setSuccess('');
    setError('');
    setPreview(null);
    if (selectedFile) {
      // Check if it's a PDF
      if (selectedFile.type === pdfType) {
        if (fileSizeInKB > 500) {
          setError('PDF file must be 100KB or less.');
          setFile(null);
          setPreview(null);
          return;
        }
      }
      // Check if it's an image file
      else if (imageTypes.includes(selectedFile.type)) {
        if (fileSizeInKB > 32) {
          setError('Image file must be 32KB or less.');
          setFile(null);
          setPreview(null);
          return;
        }
        setPreview(URL.createObjectURL(selectedFile));
      } else {
        setError('Invalid file type. Please upload a PDF or an image (jpeg, jpg, png, gif).');
        setFile(null);
        setPreview(null);
        return;
      }

      setFile(selectedFile);
      setError('');

      // Automatically upload the file
      uploadFileToServer(selectedFile);
    }
  }

  async function uploadFileToServer(selectedFile) {
    if (!selectedFile) {
      setError('No file selected to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('filedata', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/upload', {  // Ensure URL matches your server endpoint
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        setSuccess('File uploaded successfully!');
        console.log('File uploaded:', data);
      } else {
        setError(data.message || 'Failed to upload file.');
      }
    } catch (err) {
      console.error('Error uploading file:', err);
      setError('Failed to upload file. Please try again.');
    }
  }

  return (
    <div>
      <input type="file" name="filedata" onChange={handleFile} />
      {preview && <img src={preview} alt="Preview" style={{ width: '200px', marginTop: '10px' }} />}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}

export default FileUpload;
