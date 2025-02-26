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
import * as Yup from 'yup';
import { SelectField, TextAreaField } from '@aws-amplify/ui-react';


export default function NewsForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: '',
    subcategory: '',
    title: '',
    shortDescription: '',
    description: '',
    status: true,
    sensorship: {
      status: 'request',
      feedback: null
    },
    image: null,
    DisplayTime: null,
  });
  const [contentTypes, setContentTypes] = useState([]);
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);
  const [errors, setErrors] = useState();

  const validationSchema = Yup.object({
    type: Yup.string().required('*Type is requied'),
    subcategory: Yup.string().required('*Subcategory is requied'),
    title: Yup.string()
      .matches(/^[A-Za-z][A-Za-z ]*$/, "*Title must contain only alphabets and single spaces")
      .test("no-leading-space", "*Title cannot start with a space", (value) => !value || !value.startsWith(" "))
      .test("no-consecutive-spaces", "*Title cannot have consecutive spaces", (value) => !value || !/\s{2,}/.test(value))
      .min(5, "*Title must be at least 8 characters")
      .max(50, "*Title cannot exceed 255 characters")
      .required("*Title is required"),
    shortDescription: Yup.string()
      .test("no-leading-space", "*Description cannot start with a space", (value) => !value || !value.startsWith(" "))
      .test("no-consecutive-spaces", "*Description cannot have consecutive spaces", (value) => !value || !/\s{2,}/.test(value))
      .min(8, "*Description must be at least 8 characters")
      .max(255, "*Description cannot exceed 255 characters")
      .required("*Description is required"),
    description: Yup.string()
      .test("no-leading-space", "*Description cannot start with a space", (value) => !value || !value.startsWith(" "))
      .test("no-consecutive-spaces", "*Description cannot have consecutive spaces", (value) => !value || !/\s{2,}/.test(value))
      .min(8, "*Description must be at least 8 characters")
      .max(255, "*Description cannot exceed 255 characters")
      .required("*Description is required"),
    status: Yup.boolean().required("*Status is required"),
    image: Yup.string().required("*Image is required"),
    DisplayTime: Yup.date().typeError('Invalid date format').required('Display Time is required')
  });

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
    const { name, value, type, files } = e.target;
    // console.log(files);

    // Update the ListItem state
    setFormData((prevValue) => {
      if (type === 'file') {
        return {
          ...prevValue,
          [name]: files[0], // Set the file object
        };
      }
      if (name === 'status') {
        return {
          ...prevValue,
          [name]: value === 'true', // Convert to boolean for status
        };
      }
      else {
        return {
          ...prevValue,
          [name]: value, // Set the value
        };
      }
    });
    try {
      await validationSchema.validateAt(name, { [name]: value });
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name]; // Remove error for this field
        return newErrors;
      });
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message })); // Set error message
    }

    if (name === 'type') {
      const response = await fetch(`http://localhost:5000/api/category-type/subcategory?category=${value}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      // console.log(data[0].subtype);

      setSubcategoryOptions(data[0].subtype);
    }
  };

  const handleEditorChange = async (e) => {
    setFormData((prev) => ({ ...prev, shortDescription: e.target.value }));
    try {
      await validationSchema.validateAt('shortDescription', { 'shortDescription': e.target.value });
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors['shortDescription']; // Remove error for this field
        return newErrors;
      });
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, shortDescription: error.message })); // Set error message
    }
  };

  //new submit handler
  const submitHandler = async (e) => {
    e.preventDefault();

    // Create FormData object to send data
    const newsData = new FormData();
    newsData.append("type", formData.type);
    newsData.append("subcategory", formData.subcategory);
    newsData.append("title", formData.title);
    newsData.append("shortDescription", formData.shortDescription);
    newsData.append("description", formData.description);
    newsData.append("status", formData.status);
    newsData.append("sensorship", JSON.stringify(formData.sensorship));
    newsData.append("image", formData.image);
    newsData.append("DisplayTime", formData.DisplayTime);

    try {
      const response = await fetch("http://localhost:5000/api/news/add", {
        method: "POST",
        body: newsData, // Send FormData
      });
      const data = await response.json()

      if (response.ok) {
        Notification.success(data.message)
        navigate('/admin/news/list')
      }
      else {
        Notification.error(data.message)
      }
    } catch (error) {
      Notification.error("Some Backend error ❌")

    }
    // finally {
    //     setTimeout(() => {
    //         setLoading(false);  // Hide loader after a delay
    //     }, 400);
    // }
  };




  const isFormValid =
    errors && Object.keys(errors).length === 0 && // Ensure errors exist before checking
    formData?.type?.trim() && 
    formData?.subcategory?.trim() && 
    formData?.title?.trim() && 
    formData?.shortDescription?.trim() &&
    formData?.description?.trim() &&
    formData?.status !== null &&
    formData?.image &&
    formData?.DisplayTime !== null ;



  return (
    <Card sx={{ minWidth: 275 }} className="w-lg-75 w-md-80 w-sm-100 mx-auto">
      <CardContent className="p-lg-7 p-md-5 p-sm-4 container">
        <h1 className="fs-1 fw-bold font-monospace">Add News</h1>

        <div className='w-100' style={{ height: '6rem' }}>
          <FormControl fullWidth size="small">
            <SelectField
              value={formData.type}
              label="Type"
              onChange={handleFormChange}
              style={{ border: errors?.type ? '2px solid red' : '1px solid #ced4da' }}

              name="type"
              onFocus={(e) => {
                e.target.style.backgroundColor = "#e6f7ff"; // Light blue on focus
                e.target.style.border = "1px solid #007bff"; // Optional: Blue border
                e.target.style.outline = "none"; // Ensure no thick border
                e.target.style.boxShadow = "none"; // Remove Amplify UI focus glow
              }}
              onBlur={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.border = errors?.title ? "2px solid red" : "1px solid #ced4da"; // Reset border
                e.target.style.outline = "none"; // Ensure no outline
                e.target.style.boxShadow = "none"; // Remove shadow
              }}
            >
              {
                contentTypes.map((values, index) => {
                  return <option value={values.title} key={index}>{values.title}</option>
                })
              }
            </SelectField>
          </FormControl>
          {errors?.type && <p style={{ color: 'red' }}>{errors.type}</p>}
        </div>

        {
          subcategoryOptions.length === 0 ? null :

            <div className='w-100' style={{ height: '6.7rem' }}>

              <FormControl fullWidth size="small">

                <SelectField
                  value={formData.subcategory}
                  label="Subcategory"
                  onChange={handleFormChange}
              style={{ border: errors?.subcategory ? '2px solid red' : '1px solid #ced4da' }}

                  name="subcategory"
                  onFocus={(e) => {
                    e.target.style.backgroundColor = "#e6f7ff"; // Light blue on focus
                    e.target.style.border = "1px solid #007bff"; // Optional: Blue border
                    e.target.style.outline = "none"; // Ensure no thick border
                    e.target.style.boxShadow = "none"; // Remove Amplify UI focus glow
                  }}
                  onBlur={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.border = errors?.title ? "2px solid red" : "1px solid #ced4da"; // Reset border
                    e.target.style.outline = "none"; // Ensure no outline
                    e.target.style.boxShadow = "none"; // Remove shadow
                  }}
                >
                  {subcategoryOptions.map((subcategory, index) => (
                    <option key={index} value={subcategory.name}>
                      {subcategory.name}
                    </option>
                  ))}
                </SelectField>
              </FormControl>

              {errors?.subcategory && <p style={{ color: 'red' }}>{errors.subcategory}</p>}
            </div>
        }

        <div className='w-100' style={{ height: '6rem' }}>
          {/* Title */}
          <TextAreaField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleFormChange}
            style={{ border: errors?.title ? '2px solid red' : '1px solid #ced4da' }}

            onFocus={(e) => {
              e.target.style.backgroundColor = "#e6f7ff"; // Light blue on focus
              e.target.style.border = "1px solid #007bff"; // Optional: Blue border
              e.target.style.outline = "none"; // Ensure no thick border
              e.target.style.boxShadow = "none"; // Remove Amplify UI focus glow
            }}
            onBlur={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.border = errors?.title ? "2px solid red" : "1px solid #ced4da"; // Reset border
              e.target.style.outline = "none"; // Ensure no outline
              e.target.style.boxShadow = "none"; // Remove shadow
            }}
            rows={1}
          />
          {errors?.title && <p className="text-danger">{errors.title}</p>}
        </div>
        <div className='w-100' style={{ height: '10rem' }}>
          {/* Short Description */}
          <label htmlFor="short-description" className="mt-3">Short Description</label>
          <Editor
            value={formData.shortDescription}
            onChange={handleEditorChange}
            // style={{ border: errors?.shortDescription ? '2px solid red' : '1px solid #ced4da' }}
            onMouseDown={(e) => {
              e.target.style.backgroundColor = "#e6f7ff"; // Light blue on focus
              e.target.style.border = "1px solid #007bff"; // Optional: Blue border
              e.target.style.outline = "none"; // Ensure no thick border
            }}
            onBlur={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.border = errors?.shortDescription ? "2px solid red" : "1px solid #ced4da"; // Reset border
              e.target.style.outline = "none"; // Ensure no outline
            }}
          />
          {errors?.shortDescription && <p className="text-danger">{errors.shortDescription}</p>}
        </div>
        <div className='w-100' style={{ height: '8.5rem' }}>
          {/* Description */}
          <TextAreaField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            style={{ border: errors?.description ? '2px solid red' : '1px solid #ced4da' }}
            multiline
            rows={3}
            onFocus={(e) => {
              e.target.style.backgroundColor = "#e6f7ff"; // Light blue on focus
              e.target.style.border = "1px solid #007bff"; // Optional: Blue border
              e.target.style.outline = "none"; // Ensure no thick border
              e.target.style.boxShadow = "none"; // Remove Amplify UI focus glow
            }}
            onBlur={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.border = errors?.title ? "2px solid red" : "1px solid #ced4da"; // Reset border
              e.target.style.outline = "none"; // Ensure no outline
              e.target.style.boxShadow = "none"; // Remove shadow
            }}
          />
          {errors?.description && <p className="text-danger">{errors.description}</p>}
        </div>

        <div className='w-100' style={{ height: '6.7rem' }}>
          <FormControl fullWidth size="small">
            <SelectField
              labelId="status-select-label"
              value={formData.status}
              onChange={handleFormChange}
              style={{ width: '100%' }}
              name="status"
              label="Status"
              onFocus={(e) => {
                e.target.style.backgroundColor = "#e6f7ff"; // Light blue on focus
                e.target.style.border = "1px solid #007bff"; // Optional: Blue border
                e.target.style.outline = "none"; // Ensure no thick border
                e.target.style.boxShadow = "none"; // Remove Amplify UI focus glow
              }}
              onBlur={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.border = errors?.title ? "2px solid red" : "1px solid #ced4da"; // Reset border
                e.target.style.outline = "none"; // Ensure no outline
                e.target.style.boxShadow = "none"; // Remove shadow
              }}
            >
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </SelectField>
          </FormControl>
          {errors?.status && <p className="text-danger">{errors.status}</p>}
        </div>

        <div className='w-100' style={{ height: '5rem' }}>
          <label htmlFor="image-upload" className='fs-4'>Image Upload</label>
          <br />
          <input
            id="image-upload"
            type="file"
            onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
            style={{ fontSize: '1rem' }}
          />
          {errors?.image && <p className="text-danger">{errors.image}</p>}
        </div>

        <div className='w-100' style={{ height: '5rem' }}>
          <label htmlFor="DisplayTime" className='fs-4'>Display Time</label>
          <br />
          <input
            type="datetime-local"
            id="DisplayTime"
            name="DisplayTime"
            onChange={handleFormChange}
            value={formData.DisplayTime}
            className="fs-4 w-50"
          />
          {errors?.DisplayTime && <p className="text-danger">{errors.DisplayTime}</p>}
        </div>
        <div className='d-flex justify-content-center'>
          <button
            type="submit"
            className="btn btn-success"
            disabled={!isFormValid}
            style={{ height: "2.7rem", width: "15rem" }}
            onClick={submitHandler}
          >
            Submit
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
