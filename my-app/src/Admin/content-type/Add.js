import React, { useState } from 'react'
import { Button, Flex, Input, Label, SelectField, Card, ThemeProvider, Theme, TextAreaField } from '@aws-amplify/ui-react';
import Sidebar from '../common/Sidebar';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { useNavigate } from 'react-router-dom'

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
        description:""
    });

    const inputHandler = (event) => {
        const { name, value } = event.target;
        setListItem((prevValue) => ({
            ...prevValue,
            [name]: name === 'status' ? value === 'true' : value  // Convert to boolean
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            //adding date also in records
            const response = await fetch("http://localhost:5000/api/content-type/add", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ListItem)
            })


            if (response.ok) {
                alert('Successfully added content type');
                setListItem({ title: "", status: true,description:"" });
                navigate('/admin/content-type')
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="wrapper">
            <Sidebar />
            <div className="main">
                <Header />
                <main className="content">
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

                </main>
                <Footer />
            </div>
        </div>

    )
}

export default Add;
