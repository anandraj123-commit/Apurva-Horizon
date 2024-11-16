import React from 'react';
import { useList } from './store/contentcontext';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    ThemeProvider,
    Theme,
} from '@aws-amplify/ui-react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Sidebar from '../common/Sidebar';
import { useNavigate } from 'react-router-dom';

const theme: Theme = {
    name: 'table-theme',
    tokens: {
        components: {
            table: {
                row: {
                    hover: {
                        backgroundColor: { value: '{colors.blue.20}' },
                    },

                    striped: {
                        backgroundColor: { value: '{colors.blue.10}' },
                    },
                },

                header: {
                    color: { value: '{colors.blue.80}' },
                    fontSize: { value: '{fontSizes.xl}' },
                },

                data: {
                    fontWeight: { value: '{fontWeights.semibold}' },
                },
            },
        },
    },
};

const List = () => {

    const navigate = useNavigate();
    const { list } = useList();
    // console.log(typeof(list[0].status));

    // console.log(typeof(list));


    return (
        <div className="wrapper">
            <Sidebar />
            <div className="main">
                <Header />
                <main className="content">
                    <div className='container d-flex flex-row justify-content-between align-self-center'>
                        <p className='text-primary display-6'>Types of Content</p>
                        <button type="button" className="btn btn-success" onClick={() => { navigate('/admin/content-type/add') }}>Add New &nbsp;+</button>
                    </div>
                    <ThemeProvider theme={theme} colorMode="light">

                        <Table highlightOnHover variation="striped">
                            <TableHead>
                                <TableRow>
                                    <TableCell as="th">S.No</TableCell>
                                    <TableCell as="th">Id</TableCell>
                                    <TableCell as="th">Title</TableCell>
                                    <TableCell as="th">Status</TableCell>
                                    <TableCell as="th">Delete</TableCell>
                                    <TableCell as="th">Update</TableCell>
                                    <TableCell as="th">View</TableCell>
                                </TableRow>
                            </TableHead>
                            {list.map((entries, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{entries._id}</TableCell>

                                        <TableCell>{entries.title}</TableCell>
                                        <TableCell>{entries.status ? "active" : "inactive"}</TableCell>

                                        <TableCell>
                                            <button type="button" class="btn ">
                                            <i className="fa-solid fa-trash fs-2" style={{color: "#d71919"}}></i>
                                            </button>
                                        </TableCell>
                                        <TableCell>
                                            <button type="button" class="btn">
                                            <i className="fa-solid fa-pen-nib fs-2" style={{color: "#FFD43B"}}></i>
                                            </button>
                                        </TableCell>
                                        <TableCell>
                                            <button type="button" class="btn" onClick={()=>{navigate(`/admin/content-type/view/${entries._id}`)}}>
                                            <i className="fa-solid fa-eye fs-2" style={{color: "#63E6BE"}}></i>
                                            </button>
                                        </TableCell>
                                    </TableRow>

                                )
                            })}
                        </Table>
                    </ThemeProvider>
                </main>
                <Footer />
            </div>
        </div>

    );
};

export default List;