import React, { useEffect, useState } from 'react';
import { useList } from './store/contentcontext';
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

    const [isReversed, setIsReversed] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [statusFilter, setStatusFilter] = useState('');

    // Filter list based on search query
    const filteredList = list.filter((entry) =>
        entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry._id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredListByStatus = filteredList.filter((entry) => {
        // Return all entries if no status filter is selected
        if (statusFilter === '') return true;
    
        // Convert the string statusFilter to a boolean for comparison
        const filterValue = statusFilter === 'true';
        return entry.status === filterValue;
    });

    // Reverse order logic
    const toggleOrder = () => {
        setIsReversed(!isReversed);
    };

    const finalList = isReversed ? [...filteredListByStatus].reverse() : filteredListByStatus;

    // Calculate paginated data
    const displayedList = finalList.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to the first page whenever rows per page changes
    };

    //search filter for status
    const inputHandler = (event) => {
        const { name, value } = event.target;
        setStatusFilter(value)
    };

    return (
        <div className="wrapper">
            <Sidebar />
            <div className="main">
                <Header />
                <main className="content">
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
                    <SearchField
                        label="Search"
                        placeholder="Search for Title or Id..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='col-lg-3 col-md-3'
                        onClear={(e) => setSearchQuery("")}
                    />
                    <SelectField
                        className='col-lg-3 col-md-3'
                        label="Status"
                        onChange={inputHandler}
                        name='status'
                        value={statusFilter}
                    >
                        <option value={true}>Active</option>
                        <option value={false}>Inactive</option>

                    </SelectField>

                    <ThemeProvider theme={theme} colorMode="light">
                        <Table highlightOnHover variation="striped">
                            <TableHead>
                                <TableRow>
                                    <TableCell as="th">
                                        S.No
                                        <i
                                            className="fas fa-sort-up m-2 cursor-pointer"
                                            onClick={toggleOrder}
                                        ></i>
                                    </TableCell>
                                    <TableCell as="th">Id</TableCell>
                                    <TableCell as="th">Title</TableCell>
                                    <TableCell as="th">Status</TableCell>
                                    <TableCell as="th">Delete</TableCell>
                                    <TableCell as="th">Update</TableCell>
                                    <TableCell as="th">View</TableCell>
                                </TableRow>
                            </TableHead>
                            {displayedList.map((entries, index) => (
                                <TableRow key={entries._id}>
                                    <TableCell>
                                        {page * rowsPerPage + index + 1}
                                    </TableCell>
                                    <TableCell>{entries._id}</TableCell>
                                    <TableCell>{entries.title}</TableCell>
                                    <TableCell>
                                        {entries.status ? 'active' : 'inactive'}
                                    </TableCell>
                                    <TableCell>
                                        <button type="button" className="btn">
                                            <i
                                                className="fa-solid fa-trash fs-2"
                                                style={{ color: '#d71919' }}
                                            ></i>
                                        </button>
                                    </TableCell>
                                    <TableCell>
                                        <button type="button" className="btn">
                                            <i
                                                className="fa-solid fa-pen-nib fs-2"
                                                style={{ color: '#FFD43B' }}
                                            ></i>
                                        </button>
                                    </TableCell>
                                    <TableCell>
                                        <button
                                            type="button"
                                            className="btn"
                                            onClick={() =>
                                                navigate(
                                                    `/admin/content-type/view/${entries._id}`
                                                )
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
                    </ThemeProvider>
                    <TablePagination
                        component="div"
                        count={finalList.length} // Total items after filtering
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default List;
