import React, { useState } from 'react';

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  function handleImage(e) {
    const file = e.target.files[0];
    const fileSizeInKB = file.size / 1024;
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/svg+xml'];

    // Check if file is valid
    if (file && validTypes.includes(file.type) && fileSizeInKB <= 35) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setError('');
      uploadImage(file); // Call the upload function
    } else {
      setError('File must be an image (jpeg, jpg, png, gif, svg) and 31KB or less.');
      setPreview(null);
      setImage(null);
    }
  }

  function uploadImage(file) {
    const formData = new FormData();
    formData.append('filedata', file);


    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        
        setSuccess('File uploaded successfully!');
        console.log('File uploaded successfully:', data);
      })
      .catch(error => {
        
        console.error('Error uploading file:', error);
        setError('Failed to upload file. Please try again.');
      });
  }

  return (
    <div>
      <form>
        <input
          type="file"
          accept=".jpeg,.jpg,.png,.gif,.svg"
          onChange={handleImage}
        />
        {preview && <img src={preview} alt="Preview" style={{ width: '20px', marginTop: '3px' }} />}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </form>
    </div>
  );
}

export default ImageUpload;
