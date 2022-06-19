import React, { useState } from 'react';
import CreateImportOrder from '../CreateImportOrder/CreateImportOrder'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./ImportOrderTable.css";
import { Button, Dropdown } from "react-bootstrap";
import { importOrderAPI } from '../../../axios/exeAPI';

function ImportOrderTable(props) {
    const [showCreateForm, setShowCreateForm] = useState(false)

    function handleCreateFormClose() {
        setShowCreateForm(false)
    }

    function handleCreateFormShow() {
        setShowCreateForm(true)
    }

    async function handleCreateImportOrder(data) {
       try {
            const createImportOrderData = {
                importOrderData: {
                    totalBill: data.total,
                    importOrderStatus: "Paid",
                    supplierId: data.supplierId
                },
                purchasedProducts: data.products
            }
            const res = await importOrderAPI.create(createImportOrderData)
            if(res.status === 201) {
                const resData = res.data
                console.log(resData)
            } else {
                console.log(res)
            }
       } catch (error) {
            console.log(error)
       }
    }
    return (
        <>
        <div className="Table">
            <h3>CURD Import Order</h3>
            <Button variant="primary" onClick={handleCreateFormShow}>
                Create Import Order
            </Button>
            <TableContainer
                component={Paper}
                style={{ boxShadow: "0px 13px 20px 0px #80808029"}}
                className="tableContainer"
                
            >
                <Table  responsive="xl" sx={{ minWidth: 650 }} aria-label="simple table" >
                    <TableHead>
                        <TableRow>
                           
                        </TableRow>
                    </TableHead>
                    <TableBody style={{ color: "white" }}>
    
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
            <CreateImportOrder
                isShow={showCreateForm}
                onCreateImportOrder={handleCreateImportOrder}
                onCloseCreateform={handleCreateFormClose}
            />
        </>
    );
}

export default ImportOrderTable;