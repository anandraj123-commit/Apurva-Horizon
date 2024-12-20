import React, { useEffect, useState } from 'react';
import Editor from 'react-simple-wysiwyg';
import {
  InputLabel,
  MenuItem,
  FormControl,
  Card,
  CardContent,
  Select,
  Button,
  TextField,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import Notification from '../../Modules/Notification';

export default function NewsForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: '',
    subcategory: '',
    title: '',
    shortDescription: '',
    description: '',
    status: '',
    image: null,
  });
  const [contentTypes, setContentTypes] = useState([]);
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);

  // Fetch all categories on component mount
  useEffect(() => {
    const fetchContentTypes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/category-type/fetchAll');
        if (response.ok) {
          const data = await response.json();
          setContentTypes(data || []);
        } else {
          console.error('Failed to fetch content types');
        }
      } catch (error) {
        console.error('Error fetching content types:', error);
      }
    };

    fetchContentTypes();
  }, []);

  // Handle form field changes
  const handleFormChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'type') {
      const response = await fetch(`http://localhost:5000/api/category-type/subcategory?category=${value}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setSubcategoryOptions(data[0].subtype);
    }
  };

  const handleEditorChange = (e) => {
    setFormData((prev) => ({ ...prev, shortDescription: e.target.value }));
  };

  return (
    <Card sx={{ minWidth: 275 }} className="w-lg-75 w-md-80 w-sm-100 mx-auto">
      <CardContent className="p-lg-7 p-md-5 p-sm-4 container">
        <h1 className="fs-1 fw-bold font-monospace">Add News</h1>

        <FormControl fullWidth size="small" style={{ gap: '15px' }}>
          {/* Type */}
          {/* <InputLabel id="type-select-label">Type</InputLabel> */}
          {/* <label htmlFor='type-select'>Type</label> */}
          <Select
            labelId="type-select-label"
            id="type-select"
            value={formData.type}
            onChange={handleFormChange}
            name="type"
            // label="Type"
          >
            {contentTypes.map((type, index) => (
              <MenuItem key={index} value={type.title}>
                {type.title}
              </MenuItem>
            ))}
          </Select>

          {/* Subcategory */}
          {/* <InputLabel id="subcategory-select-label">Subcategory</InputLabel> */}
          {
            subcategoryOptions.length===0?null:<Select
            labelId="subcategory-select-label"
            id="subcategory-select"
            value={formData.subcategory}
            onChange={handleFormChange}
            name="subcategory"
            // label="Subcategory"
          >
            {subcategoryOptions.map((subcategory, index) => (
              <MenuItem key={index} value={subcategory.name}>
                {subcategory.name}
              </MenuItem>
            ))}
          </Select>
          }
          

          {/* Title */}
          <TextField
            label="Title"
            variant="outlined"
            size="small"
            name="title"
            value={formData.title}
            onChange={handleFormChange}
            fullWidth
          />

          {/* Short Description */}
          <label htmlFor="short-description" className="mt-3">Short Description</label>
          <Editor
            id="short-description"
            value={formData.shortDescription}
            onChange={handleEditorChange}
          />

          {/* Description */}
          <TextField
            label="Description"
            variant="outlined"
            size="small"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            multiline
            rows={4}
            fullWidth
          />

          {/* Status */}
          {/* <InputLabel id="status-select-label">Status</InputLabel> */}
          <Select
            labelId="status-select-label"
            id="status-select"
            value={formData.status}
            onChange={handleFormChange}
            name="status"
            // label="Status"
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>

          {/* Image Upload */}
          <label htmlFor="image-upload">Image Upload</label>
          <input
            id="image-upload"
            type="file"
            onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
          />

          {/* Display Time */}
          <label htmlFor="DisplayTime" className="d-inline">Display Time</label>
          <input
            type="datetime-local"
            id="DisplayTime"
            name="DisplayTime"
            className="fs-4 d-inline w-50"
          />

          <Button
            variant="contained"
            color="success"
            endIcon={<SendIcon />}
            onClick={() => console.log('Submit form', formData)}
          >
            Submit
          </Button>
        </FormControl>
      </CardContent>
    </Card>
  );
}
