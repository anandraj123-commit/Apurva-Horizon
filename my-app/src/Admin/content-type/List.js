import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    ThemeProvider,
    Theme,
    SearchField,
    SelectField,
} from '@aws-amplify/ui-react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Sidebar from '../common/Sidebar';
import './css/pagination.css'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

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

    useEffect(() => {
        const fetchData = async () => {
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
        };

        fetchData();
    }, [page, rowsPerPage]);

    //delete handler 
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
        <div className="wrapper">
            <Sidebar />
            <div className="main">
                <Header />
                <main className="content">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/admin/content-type">
                            Content - Type
                        </Link>
                    </Breadcrumbs>
                    <div className="container d-flex flex-row justify-content-between align-self-center">
                        <p className="text-primary display-6">Types of Content</p>
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => navigate('/admin/content-type/add')}
                        >
                            Add New &nbsp;+
                        </button>
                    </div>

                    <ThemeProvider theme={theme} colorMode="light">
                        <Table highlightOnHover variation="striped">
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
                                        <SearchField
                                            label="Search"
                                            placeholder="Search"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-75"
                                            hasSearchButton={false}
                                            onClear={() => setSearchQuery('')}
                                        />
                                    </TableCell>
                                    <TableCell as="th">Title
                                        <SearchField
                                            label="Search"
                                            placeholder="Search"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-75"
                                            hasSearchButton={false}
                                            onClear={() => setSearchQuery('')}
                                        />
                                    </TableCell>
                                    <TableCell as="th">Image</TableCell>
                                    <TableCell as="th">Status
                                        <SelectField
                                            className="w-100"
                                            onChange={(e) => setStatusFilter(e.target.value)}
                                            name="status"
                                            value={statusFilter}
                                        >
                                            <option value="">All</option>
                                            <option value="true">Active</option>
                                            <option value="false">Inactive</option>
                                        </SelectField>
                                    </TableCell>
                                    <TableCell as="th">Created At
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={searchDate}
                                            onChange={handleDateChange}
                                        />
                                    </TableCell>
                                    <TableCell as="th">Delete</TableCell>
                                    <TableCell as="th">Update</TableCell>
                                    <TableCell as="th">View</TableCell>
                                </TableRow>
                            </TableHead>
                            {finalList.map((entry, index) => (
                                <TableRow key={entry._id}>
                                    <TableCell className='text-center'>{page * rowsPerPage + index + 1}</TableCell>
                                    <TableCell>{entry._id}</TableCell>
                                    <TableCell>{entry.title}</TableCell>
                                    <TableCell>
                                        <img src="https://picsum.photos/id/1/200/100" alt="content" />
                                    </TableCell>
                                    <TableCell className="text-center">{entry.status ? 'active' : 'inactive'}</TableCell>
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
                        </Table>
                        <TablePagination
                            component="div"
                            count={totalCount}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            className='mt-3'
                        />
                    </ThemeProvider>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default List;
