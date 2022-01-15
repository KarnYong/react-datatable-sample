import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Image from 'react-bootstrap/Image'
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.css";

function App() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [totalRows, setTotalRows] = useState(0);
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(10);

  const columns = [
    {
        name: 'Name',
        selector: row => row.name,
				width: '150px'
    },
    {
        name: 'Image',
        cell: (row) => <Image src={row.coverimage} width={100} />,
				width: '150px'
    },
    {
        name: 'Detail',
        selector: row => row.detail,
				width: '1000px'
    },
    {
        name: 'latitude',
        selector: row => row.latitude,
    },
    {
        name: 'longitude',
        selector: row => row.longitude,
    },
    {
        name: 'Button',
        selector: row => row.id,
        cell: (row) => <button onClick={() => handleButtonClick(row.id)} value={row.id}>{row.id}</button>,
    },
  ];

  const handleButtonClick = (id) => {
		alert(id)
	};

  const handleChange = ({ selectedRows }) => {
    // You can set state or dispatch with something like Redux so we can use the retrieved data
    console.log('Selected Rows: ', selectedRows);
  };

	const fetchData = async (page, perPage) => {
		setLoading(true);
		setPage(page)

		const response = await axios.get(`https://www.mecallapi.com/api/th/attractions?page=${page}&per_page=${perPage}&delay=1`);
		setData(response.data.data);
		setTotalRows(response.data.total);
		setLoading(false);
	};

	const handlePageChange = page => {
		fetchData(page, perPage);
	};

	const handlePerRowsChange = async (newPerPage, page) => {
		setLoading(true);
		fetchData(page, newPerPage)
		setPerPage(newPerPage);
		setLoading(false);
	};

	useEffect(() => {
		fetchData(page, perPage); // fetch page
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<DataTable
			title="Users"
			columns={columns}
			data={data}
			progressPending={loading}
			pagination
			paginationServer
			paginationTotalRows={totalRows}
			onChangeRowsPerPage={handlePerRowsChange}
			onChangePage={handlePageChange}
      selectableRows
      onSelectedRowsChange={handleChange}
		/>
	);
}

export default App;
