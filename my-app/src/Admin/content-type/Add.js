import React, { useState } from 'react'
import { Button, Flex, Input, Label, SelectField, Card, ThemeProvider, Theme, TextAreaField } from '@aws-amplify/ui-react';
import Sidebar from '../common/Sidebar';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { useNavigate } from 'react-router-dom';
import ImageUpload from '../Imageupload';
import TextField from '@mui/material/TextField';
import CustomSeparator from '../common/Breadcrumbs';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notification from '../../Modules/Notification';

const theme: Theme = {
    
    name: 'card-theme',
    tokens: {
        components: {
            card: {
                // You can reference other tokens
                backgroundColor: { value: '{colors.background.success}' },
                borderRadius: { value: '{radii.large}' },
                padding: { value: '{space.xl}' },

                elevated: {
                    backgroundColor: { value: '{colors.background.info}' },
                    boxShadow: { value: '{shadows.large}' },
                },
            },
        },
    },
};


const Add = () => {

    const navigate = useNavigate()

    const [ListItem, setListItem] = useState({
        title: "",
        status: true,
        description: "",
        imagefile: null
    });
    const [loading, setLoading] = useState(false);
    const inputHandler = (event) => {
        const { name, value } = event.target;
        setListItem((prevValue) => ({
            ...prevValue,
            [name]: name === 'status' ? value === 'true' : value  // Convert to boolean
        }));
    };

    const imageUploadHandler = (file) => {
        setListItem((prevValue) => ({
            ...prevValue,
            imagefile: file,
        }));
    };
   

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!ListItem.title || !ListItem.description) {
            alert('Title and Description are required!');
            return; // Prevent form submission if validation fails
        }
        if(!ListItem.ImageUpload)
        {
            alert('please upload Image');
        }
        try {
            //adding date also in records
            const response = await fetch("http://localhost:5000/api/content-type/add", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ListItem)
            })
            const data = await response.json()
            if (response.ok) {
                alert('Successfully added content type');
                // setListItem({ title: "", status: true, description: "" });
                setListItem({ title: "", status: true, description: "" });
                Notification.success(data.message)
                navigate('/admin/content-type')
            }
            else {
                Notification.error(data.message)
            }

        } catch (error) {
                Notification.error("Some Backend error ❌")
        }
        finally {
            setTimeout(() => {
                setLoading(false);  // Hide loader after a delay
            }, 400);
        }
    }

    return (
        <>
        {/* { loading ? <div className="modal">
            <div className="loader"> </div>
        </div>:
        <div className="wrapper">
            <Sidebar />
            <div className="main">
                <Header />
                <main className="content">
                <CustomSeparator/>
                    <ThemeProvider theme={theme} colorMode="light">
                        <Card variation="elevated" style={{ width: '500px', height: '700px' }} className='py-5 mx-auto'>
                            <div className='container'>
                                <p className='text-primary display-5 text-center fw-medium' style={{
                                    fontSize: '2rem',  // Adjust the font size
                                    fontWeight: '500'  // Lighter font weight
                                }}>ADD NEW TYPE</p>
                            </div>
                            <Flex as="form" direction="column" width="20rem" onSubmit={submitHandler} className='container'>
                                <Flex direction="column" gap="small">

                                    <TextField id="outlined-basic" 
                                    name='title'
                                    label="Content-Title" 
                                    variant="outlined" 
                                    isRequired 
                                    onChange={inputHandler} 
                                    value={ListItem.title} />
                                    {/* <Label htmlFor="title">Content-Title</Label> */}
                                    {/* <Input id="title" type="text" name='title' isRequired onChange={inputHandler} value={ListItem.title} /> */}
                                {/* </Flex>
                                <Flex direction="column" gap="small">
                                   
                                    <TextField
                                        id="outlined-multiline-static"
                                        name="description"
                                        placeholder="Enter a description"
                                        isRequired
                                        onChange={inputHandler}
                                        value={ListItem.description}
                                        label="Description"
                                        multiline
                                        rows={4}
                                    />
                                </Flex>
                                <Flex direction="column" gap="small">
                                    <SelectField
                                        label="Status"
                                        descriptiveText="Should your title be Active or Inactive?"
                                        onChange={inputHandler}
                                        name='status'
                                        value={ListItem.status}
                                    >
                                        <option value={true}>Active</option>
                                        <option value={false}>Inactive</option>

                                    </SelectField>
                                </Flex>
                                <Flex direction="column" gap="small">
                                    <Label htmlFor="title">Upload Image</Label>
                                    <div style={{ minHeight: '100px' }}> {/* Reserve space for previews */}
                                        {/* <ImageUpload onImageUpload={imageUploadHandler} />
                                    </div>
                                </Flex>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </Flex> */} 

        <ThemeProvider theme={theme} colorMode="light">
            <Card variation="elevated" className='container w-50 py-5 mx-auto '>
                <div className='container'>
                    <p className='text-primary display-6 text-center fw-medium'>Add New Type</p>
                </div>
                <Flex as="form" direction="column" width="20rem" onSubmit={submitHandler} className='container'>
                    <Flex direction="column" gap="small">
                        <Label htmlFor="title">Content-Title</Label>
                        <Input id="title" type="text" name='title' isRequired onChange={inputHandler} value={ListItem.title} />
                    </Flex>
                    <Flex direction="column" gap="small">
                        <TextAreaField
                            label="Description"
                            name="description"
                            placeholder="Enter a description"
                            isRequired
                            onChange={inputHandler}
                            value={ListItem.description}
                            rows={3} />
                    </Flex>
                    <Flex direction="column" gap="small">
                        <SelectField
                            label="Status"
                            descriptiveText="Should your title be Active or Inactive?"
                            onChange={inputHandler}
                            name='status'
                            value={ListItem.status}
                        >
                            <option value={true}>Active</option>
                            <option value={false}>Inactive</option>

                        </SelectField>
                    </Flex>
                    <Button type="submit">Submit</Button>
                </Flex>

            </Card>

        </ThemeProvider>


                {/* </main>
                <Footer />
            </div>
        </div>
        } */}
        </>

    )
}

export default Add;
