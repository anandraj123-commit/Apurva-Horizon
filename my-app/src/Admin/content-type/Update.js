import React, { useState, useEffect } from 'react';
import { Button, Flex, Input, Label, SelectField, Card, ThemeProvider, Theme, TextAreaField } from '@aws-amplify/ui-react';
import Sidebar from '../common/Sidebar';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

const theme: Theme = {
    name: 'card-theme',
    tokens: {
        components: {
            card: {
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

const Update = () => {
    const { id } = useParams(); // Get the ID of the item to update
    const navigate = useNavigate();
    const [ListItem, setListItem] = useState({
        title: "",
        status: true,
        description: ""
    });

    // Fetch existing data for the item
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/content-type/view/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    // console.log(data);

                    setListItem({
                        title: data.title,
                        status: data.status,
                        description: data.description,
                    });
                } else {
                    console.error("Failed to fetch item data");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); // Set loading to false after fetch
            }
        };

        fetchData();
    }, [id]);


    if (loading) {
        return <p>Loading...</p>; // Render a loading indicator
    }

    // Handle input changes
    const inputHandler = (event) => {
        const { name, value } = event.target;
        setListItem((prevValue) => ({
            ...prevValue,
            [name]: name === 'status' ? value === 'true' : value, // Convert to boolean
        }));
    };

    // Handle form submission
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/content-type/update/${id}`, {
                method: "PUT", // Use PUT or PATCH for updates
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ListItem),
            });

            if (response.ok) {
                alert('Successfully updated content type');
                navigate('/admin/content-type'); // Redirect after update
            } else {
                alert('Failed to update content type');
            }
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };

    return (
        <div className="wrapper">
            <Sidebar />
            <div className="main">
                <Header />
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/admin/content-type">
                        Content - Type
                    </Link>
                    <Link underline="hover" color="inherit" href={`/admin/content-type/update/${id}`}>
                        Update
                    </Link>
                </Breadcrumbs>
                <main className="content">
                    <ThemeProvider theme={theme} colorMode="light">
                        <Card variation="elevated" className="container w-50 py-5 mx-auto">
                            <div className="container">
                                <p className="text-primary display-6 text-center fw-medium">Update Content Type</p>
                            </div>
                            <Flex as="form" direction="column" width="20rem" onSubmit={submitHandler} className="container">
                                <Flex direction="column" gap="small">
                                    <Label htmlFor="title">Content-Title</Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        name="title"
                                        isRequired
                                        onChange={inputHandler}
                                        value={ListItem.title}
                                    />
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
                                        name="status"
                                        value={ListItem.status}
                                    >
                                        <option value={true}>Active</option>
                                        <option value={false}>Inactive</option>
                                    </SelectField>
                                </Flex>
                                <Button type="submit">Update</Button>
                            </Flex>
                        </Card>
                    </ThemeProvider>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Update;
