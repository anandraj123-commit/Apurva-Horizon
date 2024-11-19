import React, { useState } from 'react';

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');


  function handleImage(e) {
    const file = e.target.files[0];
    const fileSizeInKB = file.size / 1024;
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/svg+xml'];

    if (file && validTypes.includes(file.type) && fileSizeInKB <= 31) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setError('');
    } else {
      setError('File must be an image (jpeg, jpg, png, gif, svg) and 25KB or less.');
      setPreview(null);
      setImage(null);
    }
  }

  return (
    <form>
      <input type="file" accept=".jpeg,.jpg,.png,.gif,.svg" onChange={handleImage} />
      {preview && <img src={preview} alt="Preview" style={{ width: '200px', marginTop: '10px' }} />}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submmit">
        Upload
      </button>
    </form>
  );
}

export default ImageUpload;
