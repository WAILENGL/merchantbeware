import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const OrderTable = ({ orders }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Order Number</TableCell>
                        <TableCell>Customer Name</TableCell>
                        <TableCell>Customer Email</TableCell>
                        <TableCell>Order Total</TableCell>
                        <TableCell>Order Date</TableCell>
                        <TableCell>Order Tags</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell>{order.order_number}</TableCell>
                            <TableCell>{`${order.customer.first_name} ${order.customer.last_name}`}</TableCell>
                            <TableCell>{order.contact_email}</TableCell>
                            <TableCell>{order.current_total_price}</TableCell>
                            <TableCell>{order.created_at}</TableCell>
                            <TableCell>{order.tags}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default OrderTable;
