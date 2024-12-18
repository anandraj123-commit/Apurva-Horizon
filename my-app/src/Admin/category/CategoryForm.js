import React, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Select from '@mui/material/Select';
import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom'
import Notification from '../../Modules/Notification';

export default function CategoryForm() {
    const navigate = useNavigate()


    //final list to submit to backend
    const [ListItem, setListItem] = useState({
        ContentType: "123",
        title: "",
        description: "",
        subtype: []
    })

    // const [contentType, setContentType] = useState(0)

    // adding subtype logic begin
    const [ContentType, setContentType] = useState([]);
    const [items, setItems] = useState([]); // State to hold the list of items
    const [newTitle, setNewTitle] = useState(''); // State to hold the title field
    const [newDescription, setNewDescription] = useState(''); // State to hold the description field
    const [editingIndex, setEditingIndex] = useState(null); // Track which item is being edited

    useEffect(() => {
        const fetchAllContentType = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/content-type/fetchAll`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                if (response.ok) {
                    const data = await response.json();
                    // console.log(data);
                    // console.log(data.results);
                    setContentType(data)
                    // setList(data.results);
                    // setTotalCount(data.totalCount); // Update totalCount from API
                } else {
                    console.error('Failed to fetch item data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        };
        fetchAllContentType();
    },[])
    //handler to add new item value in title and desctiption of top level
    const handleChangeInTopTitleDesc = (e) => {
        const { name, value } = e.target;
        setListItem((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }

    // Handler to update the new item value
    const handleTitleChange = (e) => {
        setNewTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setNewDescription(e.target.value);
    };

    // Handler to add or update an item
    const handleAddOrUpdateItem = () => {
        if (newTitle.trim() === '' || newDescription.trim() === '') return;

        if (editingIndex !== null) {
            // Update existing item
            const updatedItems = items.map((item, index) =>
                index === editingIndex ? { title: newTitle, description: newDescription } : item
            );
            setItems(updatedItems);
            setListItem((preValue) => {
                return {
                    ...preValue,
                    subtype: updatedItems
                }
            })
            setEditingIndex(null); // Reset editing state
        } else {
            // Add new item
            const updatedItems = [...items, { title: newTitle, description: newDescription }];
            setItems(updatedItems);
            setListItem((prev) => ({
                ...prev,
                subtype: updatedItems, // Update subtype to reflect the latest items
            }));
        }
        setNewTitle(''); // Clear the title field
        setNewDescription(''); // Clear the description field
    };

    // Handler to delete an item
    const handleDeleteItem = (index) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
        setListItem((preValue) => {
            return {
                ...preValue,
                subtype: updatedItems
            }
        })
    };

    // Handler to edit an item
    const handleEditItem = (index) => {
        setNewTitle(items[index].title);
        setNewDescription(items[index].description);
        setEditingIndex(index);
    };
    // adding subtype logic ends



    //submit handler
    const submitHandler = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/category-type/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(ListItem)
            })
            // const data = await response.json()
            if (response.ok) {
                // console.log("successfully posted");
                Notification.success("successfully added")
                navigate('/admin/category-type/list')
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (


        <Card sx={{ minWidth: 275 }} className='w-lg-75 w-md-80 w-sm-100 mx-auto'>
            <CardContent className='p-lg-7 p-md-5 p-sm-4 container '>
                <h1 className='fs-1 fw-bold font-monospace'>Add Category</h1>
                <h2 className='mb-4'>Category</h2>
                <FormControl fullWidth size="small"
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: "wrap",
                        gap: '15px', // Adds spacing between items
                        alignItems: 'center', // Vertically aligns items
                    }}>
                    <InputLabel id="demo-select-small-label">Type</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={ListItem.ContentType}
                        label="Type"    
                        onChange={handleChangeInTopTitleDesc}
                        style={{ width: '40%' }}
                        name="ContentType"
                    >
                    {
                        ContentType.map((values,index)=>{
                            return <MenuItem value={values.title}>{values.title}</MenuItem>
                        })
                    }

                        {/* <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem> */}
                    </Select>
                    <TextField id="filled-hidden-label-small"
                        style={{ flex: 1 }}
                        label="Title" variant="outlined" size="small"
                        placeholder="Enter title"
                        value={ListItem.title}
                        onChange={handleChangeInTopTitleDesc}
                        name="title"
                    />
                    <TextField id="filled-hidden-label-small"
                        style={{ width: '100%' }}
                        label="Description" variant="outlined" size="small"
                        placeholder="Enter description"
                        onChange={handleChangeInTopTitleDesc}
                        value={ListItem.description}
                        multiline
                        name="description"
                        rows={3} />
                    {/* Adding subtype ui */}
                    <div style={{ fontFamily: 'Arial, sans-serif' }} className="w-100">
                        <h2 className='mb-4'>Sub Categories</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '10px' }}>
                            {/* Title Input */}

                            <TextField
                                id="filled-hidden-label-small"
                                value={newTitle}
                                onChange={handleTitleChange}
                                placeholder="Enter title"
                                style={{ flex: 1 }}
                                label="Title"
                                variant="outlined"
                                size="small"

                            />

                            {/* Description Input */}
                            <TextField id="filled-hidden-label-small"
                                style={{ width: '100%' }}
                                label="Description" variant="outlined" size="small"
                                value={newDescription}
                                onChange={handleDescriptionChange}
                                placeholder="Enter description"
                                multiline
                                rows={3}
                            />


                            {/* Add Button */}
                            <Button
                                className="w-25"
                                variant="contained"
                                onClick={handleAddOrUpdateItem}
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    alignSelf: 'start', // Align button to the left
                                }}
                            >
                                {editingIndex !== null ? 'Update Subtype' : 'Add Subtype'}
                            </Button>

                        </div>

                        {/* List Display */}
                        <ul style={{ padding: '0', listStyleType: 'none' }}>
                            {items.map((item, index) => (
                                <li
                                    key={index}
                                    style={{
                                        backgroundColor: '#f8f9fa',
                                        margin: '5px 0',
                                        padding: '10px',
                                        borderRadius: '4px',
                                        border: '1px solid #ddd',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div>
                                        <strong>{item.title}</strong>
                                        <p style={{ margin: '5px 0' }}>{item.description}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => handleEditItem(index)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleDeleteItem(index)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <hr className='mt-5 mb-2' />
                    </div>
                    <Button variant="contained" color="success" endIcon={<SendIcon />} className='px-3 py-3 w-25 mx-auto' onClick={submitHandler}>
                        Submit
                    </Button>
                </FormControl>
            </CardContent>
        </Card>

    )
}
