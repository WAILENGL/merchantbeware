import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; 
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-quartz.css"; 
import DataModal from './Modal';

const OrderTable = ({orders}) => {

    const [open, setOpen] = useState(false);
    const [item, setItem] = useState({});

    const gettingData = orders?.map(
        items => {
            return {
                Order: items?.order_number,
                Date: new Date(items?.customer?.created_at),
                Customer:`${items?.customer?.first_name}   ${items?.customer?.last_name}`,
                Channel: "Online",
                Total: `${"$"}${items?.total_price}`,
                "Payment Status" : items?.financial_status,
                "Customer Tag": `${items?.customer?.tags}`,
                "Orders Tag": items?.tags,
                "Customer Address" : `${items?.customer?.default_address?.address1}, ${items?.customer?.default_address?.city}, ${items?.customer?.default_address?.province}, ${items?.customer?.default_address?.country},`,
                other: {...items}
                
            }
        }
    )


    const [rowData, setRowData] = useState([
        {
            Order: "001",
            Date: "2023-05-01",
            Customer: "John Doe",
            Channel: "Online",
            Total: "$150.00",
            "Payment Status": "Paid",
            "Fulfillment Status": "Fulfilled",
            Items: 3,
            "Delivery Status": "Delivered",
            "Delivery Method": "Courier",
            Tag: "New"
        },
        {
            Order: "002",
            Date: "2023-05-02",
            Customer: "Jane Smith",
            Channel: "In-Store",
            Total: "$250.00",
            "Payment Status": "Pending",
            "Fulfillment Status": "Processing",
            Items: 5,
            "Delivery Status": "In Transit",
            "Delivery Method": "Postal",
            Tag: "Returning"
        },
        {
            Order: "003",
            Date: "2023-05-03",
            Customer: "Mike Johnson",
            Channel: "Online",
            Total: "$100.00",
            "Payment Status": "Paid",
            "Fulfillment Status": "Fulfilled",
            Items: 2,
            "Delivery Status": "Delivered",
            "Delivery Method": "Courier",
            Tag: "VIP"
        },
    ]);

    const [colDefs, setColDefs] = useState([
        { field: "Order", cellStyle: { textAlign: 'start' }, checkboxSelection: true },
        { field: "Date", cellStyle: { textAlign: 'start' } },
        { field: "Customer", cellStyle: { textAlign: 'start' } },
        { field: "Customer Address", cellStyle: { textAlign: 'start' } },
        { field: "Channel", cellStyle: { textAlign: 'start' } },
        { field: "Total", cellStyle: { textAlign: 'start' } },
        { field: "Payment Status", cellStyle: { textAlign: 'start' } },
     
    
        { field: "Customer Tag", cellStyle: { textAlign: 'start' } },
        { field: "Orders Tag", cellStyle: { textAlign: 'start' } },
    ]);

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setItem({})
    }

    const handleRowClicked = (e) => {
        setItem(e.orders?.other)
        handleOpen()
    }

    return (
        <div
            className="ag-theme-quartz" // applying the grid theme
            style={{ height: 500}} // the grid will fill the size of the parent container
        >
            <AgGridReact
                rowData={gettingData}
                columnDefs={colDefs}
                rowSelection="multiple" // enable single row selection
                onRowClicked={handleRowClicked}
            />

            <DataModal open={open} handleClose={handleClose} items={item}/>
        </div>
    );
};

export default OrderTable;
