import React, { useState } from 'react';
// for upload button cloud wala
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// -----end
function ImageUpload() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  // for upload button cloud wala
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  // --end
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


    fetch('http://localhost:5000/api/file/upload', {
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
        setError(error.message || 'Failed to upload file. Please try again.');
      });
  }

  return (
    <div >
  <div  style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
  <Button
  component="label"
  role={undefined}
  variant="contained"
  tabIndex={-1}
  startIcon={<CloudUploadIcon />}
  accept=".jpeg,.jpg,.png,.gif,.svg"
      style={{ marginRight: '10px' }} 
>
  Upload Image
  <VisuallyHiddenInput
    type="file"
    onChange={handleImage}
    multiple
  />
</Button>
    {/* <input
      type="file"
      accept=".jpeg,.jpg,.png,.gif,.svg"
      onChange={handleImage}
      style={{ marginRight: '10px' }} 
    /> */}
    {preview && <img src={preview} alt="Preview" style={{ width: '30px', height: 'auto', marginTop: '3px' }} />}
  </div>
  {error && <p style={{ color: 'red', marginTop: '5px' }}>{error}</p>}
  {success && <p style={{ color: 'green', marginTop: '5px' }}>{success}</p>}
    </div>
  );
}

export default ImageUpload;
