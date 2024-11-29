import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import ReactSearchBox from "react-search-box";
import Button from '@mui/material/Button';
import { MdModeEditOutline } from "react-icons/md";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { RiDeleteBinLine } from "react-icons/ri";

import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    ThemeProvider,
    Theme,
    SearchField,
    SelectField,
    Loader,
    Breadcrumbs,
} from '@aws-amplify/ui-react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Sidebar from '../common/Sidebar';
import './css/pagination.css';
import { Badge } from '@mui/material';
import  CustomSeparator from "../common/Breadcrumbs";
import '../asset/css/Loader.css';
// import '../asset/css/common.css';

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
    const [list, setList] = useState([]);
    const [totalCount, setTotalCount] = useState(0); // Total items from backend
    const [isReversed, setIsReversed] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchDate, setSearchDate] = useState(''); // State for "Created At" filter
    const [page, setPage] = useState(0); // MUI pagination uses 0-based indexing
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [statusFilter, setStatusFilter] = useState('');
    // for loading
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `http://localhost:5000/api/content-type/users?page=${page + 1}&limit=${rowsPerPage}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                if (response.ok) {
                    const data = await response.json();
                    setList(data.results);
                    setTotalCount(data.totalCount); // Update totalCount from API
                } else {
                    console.error('Failed to fetch item data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            finally {
                setTimeout(() => {
                    setLoading(false);  // Hide loader after a delay
                }, 400);
            }
        };

        fetchData();
    }, [page, rowsPerPage]);


    const deleteHandler = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/content-type/delete/${id}`, {
                method: "GET",
            })

        } catch (error) {
            console.log(error);
        }

    }

    // Filter list based on search query
    const filteredList = list.filter((entry) =>
        entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry._id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredListByStatus = filteredList.filter((entry) => {
        if (statusFilter === '') return true;
        const filterValue = statusFilter === 'true';
        return entry.status === filterValue;
    });

    const filteredListByDate = filteredListByStatus.filter((entry) => {
        if (!searchDate) return true;
        const createdAtDate = new Date(entry.createdAt).toISOString().split('T')[0];
        return createdAtDate === searchDate;
    });

    // Reverse order logic
    const toggleOrder = () => {
        setIsReversed(!isReversed);
    };

    const finalList = isReversed ? [...filteredListByDate].reverse() : filteredListByDate;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to the first page
    };

    const handleDateChange = (event) => {
        setSearchDate(event.target.value);
    };

    return (
        <>
        { loading ? <div className="modal">
            <div className="loader"></div>
        </div> : 
        <div className="wrapper">
            
            <Sidebar />
            <div className="main">
                <Header />
                <main className="content" >
                <CustomSeparator/>
                    <div className="container d-flex flex-row justify-content-between align-self-center">
                        <p className="text-primary" style={{ fontSize: "200%", fontWeight: "550" ,height:'10px' }}>TYPES OF CONTENT</p>
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => 
                            {setLoading(true);
                                { loading ? <div className="modal">
            <div className="loader"></div>
        </div> : (navigate('/admin/content-type/add'))
                            }}}
                        >
                            ADD&nbsp;+
                        </button>

                    </div>
                    <br></br> 
                    {/* { loading ?<div className="modal">
            <div className="loader"></div>
        </div>: ( */}
                    <ThemeProvider theme={theme} colorMode="light">
                        <div class="table-responsive">
                            <Table highlightOnHover variation="striped" className="table-container">
                                <TableHead>
                                    <TableRow>
                                        <TableCell as="th" >
                                            S.No
                                            <i
                                                className="fas fa-sort-up m-2 cursor-pointer"
                                                onClick={toggleOrder}
                                            ></i>
                                        </TableCell>
                                        <TableCell as="th">Id
                                            {/* <SearchField
                                            label="Search"
                                            placeholder="Search"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-75"
                                            onClear={() => setSearchQuery('')}
                                            
                                        /> */}
                                            <ReactSearchBox
                                                placeholder="Search ID"
                                                onChange={(value) => setSearchQuery(value)} // `value` is the current input
                                                onClear={() => setSearchQuery('')}
                                                className="w-75"
                                                style={{
                                                    padding: '4px',   // Reduce padding
                                                    height: '40px',
                                                    width: '30px',   // Adjust widt
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell as="th">Title
                                            {/* <SearchField
                                            label="Search"
                                            placeholder="Search"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-75"
                                            onClear={() => setSearchQuery('')}
                                        /> */}
                                            <ReactSearchBox
                                                placeholder="Search"
                                                onChange={(value) => setSearchQuery(value)}
                                                onClear={() => setSearchQuery('')}
                                                className="w-75"
                                                style={{
                                                    fontSize: '12px', // Reduce font size
                                                    padding: '4px',   // Reduce padding
                                                    height: '40px',
                                                    width: '30px',   // Adjust widt
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell as="th">Image</TableCell>
                                        <TableCell as="th">Status
                                            {/* <SelectField

                                               className="w-75"
                                                onChange={(e) => setStatusFilter(e.target.value)}
                                                name="status"
                                                value={statusFilter}
                                                
                                            >
                                                <option value="">All</option>
                                                <option value="true">Active</option>
                                                <option value="false">Inactive</option>
                                            </SelectField> */}
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-filter-select"
                                                value={statusFilter}
                                                label="status"
                                                displayEmpty
                                                onChange={(e) => setStatusFilter(e.target.value)}
                                                style={{
                                                    fontSize: '7px',
                                                    position: 'relative', // Allow movement within its container
                                                    top: '-0.3px', // Move it upward
                                                    height: '36px', // Adjust height
                                                    width: '70px', // Set width

                                                }}
                                            >
                                                <MenuItem value="">All</MenuItem>
                                                <MenuItem value="true">Active</MenuItem>
                                                <MenuItem value="false">Inactive</MenuItem>
                                            </Select>
                                        </TableCell>
                                        <TableCell as="th">Created At
                                            <input
                                                type="date"
                                                className="form-control"
                                                value={searchDate}
                                                onChange={handleDateChange}
                                                style={{
                                                    fontSize: '12px', // Reduce font size
                                                    padding: '4px',   // Reduce padding
                                                    height: '40px',
                                                    width: '70px',   // Adjust widt
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell as="th">Delete</TableCell>
                                        <TableCell as="th">Update</TableCell>
                                        <TableCell as="th">View</TableCell>
                                    </TableRow>
                                </TableHead>
                                <tbody>
                                    {finalList.map((entry, index) => (
                                        <TableRow key={entry._id}>
                                            <TableCell className='text-center'>{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell>{entry._id}</TableCell>
                                            <TableCell>{entry.title}</TableCell>
                                            <TableCell>
                                                <img src="https://picsum.photos/id/1/200/100" alt="content" />
                                            </TableCell>
                                            <TableCell className="text-center">
                                            {/* <Badge
                            size="small"
                            variation={document.status ? 'success' : 'error'}
                        >
                            {document.status ? 'Active' : 'Inactive'}
                        </Badge> */}
                                            {entry.status ? 'active' : 'inactive'}
                                            </TableCell>
                                            <TableCell>
                                                {new Intl.DateTimeFormat('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                }).format(new Date(entry.createdAt))}
                                            </TableCell>
                                            <TableCell className="text-center">
                                        <button type="button" className="btn"
                                            onClick={() => { deleteHandler(entry._id) }}
                                        >
                                            <i
                                                className="fa-solid fa-trash fs-2"
                                                style={{ color: '#d71919' }}
                                            ></i>
                                        </button>
                                                {/* <Button variant="outlined" size="small" className="btn"
                                                    onClick={() => navigate(`/admin/content-type/update/${entry._id}`)} style={{
                                                        padding: '2px 6px',   // Shrink padding
                                                        fontSize: '7px',     // Adjust font size
                                                        minWidth: 'auto',     // Prevent default min width
                                                    }}>
                                                    <RiDeleteBinLine />DELETE</Button> */}
                                            </TableCell>
                                            <TableCell className="text-center">


                                            <button
                                            type="button"
                                            className="btn"
                                            onClick={() =>
                                                navigate(`/admin/content-type/update/${entry._id}`)
                                            }
                                        >
                                            <i
                                                className="fa-solid fa-pen-nib fs-2"
                                                style={{ color: '#FFD43B' }}
                                            ></i>
                                        </button>
                                                {/* <Button variant="outlined" size="small" className="btn"
                                                    onClick={() => navigate(`/admin/content-type/update/${entry._id}`)} style={{
                                                        padding: '2px 6px',   // Shrink padding
                                                        fontSize: '7px',     // Adjust font size
                                                        minWidth: 'auto',     // Prevent default min width
                                                    }}> <MdModeEditOutline />UPDATE</Button> */}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <button
                                                    type="button"
                                                    className="btn"
                                                    onClick={() =>
                                                        navigate(`/admin/content-type/view/${entry._id}`)
                                                    }
                                                >
                                                    <i
                                                        className="fa-solid fa-eye fs-2"
                                                        style={{ color: '#63E6BE' }}
                                                    ></i>
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                        <TablePagination
                            component="div"
                            count={totalCount} // Use totalCount from API
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            className='mt-3'
                        />
                    </ThemeProvider> 
                    {/* )} */}
                    
                       
                </main>
                <Footer />
            </div>
        </div>
        }
        </>
    );
};

export default List;
