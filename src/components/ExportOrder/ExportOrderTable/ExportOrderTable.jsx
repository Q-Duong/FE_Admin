import React, { useEffect, useState } from 'react';
import CreateImportOrder from '../CreateImportOrder/CreateImportOrder'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./ExportOrderTable.css";
import { Button, Dropdown } from "react-bootstrap";
import { exportOrderAPI } from '../../../axios/exeAPI';
import { TableCell } from '@mui/material';
import numberWithCommas from '../../../utils/numberWithCommas';
import formatDate from '../../../utils/formatDate';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

function ExportOrderTable(props) {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [exportOrders, setExportOrder] =
        useState([]);

    function handleCreateFormClose() {
        setShowCreateForm(false)
    }

    function handleCreateFormShow() {
        setShowCreateForm(true)
    }

    useEffect(()=> {
        async function getExportOrder() {
            try {
                const res = await exportOrderAPI.getAll();
                if(res.status === 200) {
                    console.log(res.data)
                    setExportOrder(res.data);
                } else{
                    console.log(res.data.message)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getExportOrder()
        
    },[])

    // async function handleCreateImportOrder(data) {
    //    try {
    //         const createImportOrderData = {
    //             importOrderData: {
    //                 totalBill: data.total,
    //                 importOrderStatus: "Paid",
    //                 supplierId: data.supplierId
    //             },
    //             purchasedProducts: data.products
    //         }
    //         const res = await importOrderAPI.create(createImportOrderData)
    //         if(res.status === 201) {
    //             const resData = res.data
    //             console.log(resData)
    //         } else {
    //             console.log(res)
    //         }
    //    } catch (error) {
    //         console.log(error)
    //    }
    // }
    return (
        <>
        <div className="Table">
            <h3>Đơn hàng </h3>
            
            <TableContainer
                component={Paper}
                style={{ boxShadow: "0px 13px 20px 0px #80808029"}}
                className="tableContainer"
                
            >
                <Table  responsive="xl" sx={{ minWidth: 650 }} aria-label="simple table" >
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Mã đơn hàng</TableCell>
                            <TableCell align="left">Tổng tiền</TableCell>
                            <TableCell align="left">Thời gian đặt hàng</TableCell>
                            <TableCell align="left">Địa chỉ giao hàng</TableCell>
                            <TableCell align="left">Ngày giao</TableCell>
                            <TableCell align="left">Trạng thái</TableCell>
                            <TableCell align="left">Xem đơn hàng</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{ color: "white" }}>
                        {exportOrders.map((exportOrder) => (
                            <TableRow
                                key={exportOrder._id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                            <TableCell align="left">{exportOrder._id}</TableCell>
                            <TableCell align="left">{numberWithCommas(exportOrder.totalBill)}</TableCell>
                            <TableCell align="left">{formatDate(exportOrder.createdAt)}</TableCell>
                            <TableCell align="left">{exportOrder.shipAddress}</TableCell>
                            <TableCell align="left">{formatDate(exportOrder.shippedDate)}</TableCell>
                            <TableCell align="left">{exportOrder.status}</TableCell>
                            {/* <TableCell align="left">{
                                exportOrder.details ? 
                                exportOrder.details.map(item => (<p>{item.product.name} - {item.productQuantity} {item.product.unit}</p>)) 
                                : ''}
                            </TableCell> */}
                            <TableCell align="left" >
                                <FontAwesomeIcon icon={faCircleInfo} /> Chi tiết
                            </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
            {/* <CreateImportOrder
                isShow={showCreateForm}
                onCreateImportOrder={handleCreateImportOrder}
                onCloseCreateform={handleCreateFormClose}
            /> */}
        </>
    );
}

export default ExportOrderTable;