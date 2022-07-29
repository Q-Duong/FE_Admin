import React, { useEffect, useState } from 'react';
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
import { TableCell } from '@mui/material';
import numberWithCommas from '../../../utils/numberWithCommas';
import formatDate from '../../../utils/formatDate';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import ImportOrderDetailTable from '../ImportOrderDetailTable/ImportOrderDetailTable';

function ImportOrderTable(props) {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showTableForm, setShowTableForm] = useState(false);
    const [importOrders, setImportOrder] = useState([]);
    const [activeImportOrderDetail, setActiveImportOrderDetail] = useState(null);

    function handleCreateFormClose() {
        setShowCreateForm(false)
    }

    function handleCreateFormShow() {
        setShowCreateForm(true)
    }

    function handleTableFormClose() {
        setShowTableForm(false)
    }

    function handleTableFormShow(detail) {
        setActiveImportOrderDetail(detail)
        setShowTableForm(true)
    }

    useEffect(()=> {
        async function getImportOrder() {
            try {
                const res = await importOrderAPI.getAll();
                if(res.status === 200) {
                    console.log(res.data)
                    setImportOrder(res.data);
                } else{
                    console.log(res.data.message)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getImportOrder()
        
    },[])

    async function handleCreateImportOrder(data) {
       try {
            const createImportOrderData = {
                importOrderData: {
                    totalBill: data.total,
                    importOrderStatus: "Paid",
                    supplierId: data.activeSupplier
                },
                purchasedProducts: data.products
            }
            const res = await importOrderAPI.create(createImportOrderData)
            if(res.status === 201) {
                const tempImportOrders = [...importOrders];
                tempImportOrders.unshift(res.data)
                setImportOrder(tempImportOrders);
                setShowCreateForm(false)
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
            <h3>Đơn nhập hàng</h3>
            <Button variant="primary" onClick={handleCreateFormShow}>
                Tạo đơn nhập
            </Button>
            <TableContainer
                component={Paper}
                style={{ boxShadow: "0px 13px 20px 0px #80808029"}}
                className="tableContainer"
                
            >
                <Table  responsive="xl" sx={{ minWidth: 650 }} aria-label="simple table" >
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Mã đơn nhập</TableCell>
                            <TableCell align="left">Tổng tiền</TableCell>
                            <TableCell align="left">Ngày nhập</TableCell>
                            <TableCell align="left">Công nợ</TableCell>
                            <TableCell align="left">Kỳ hạn nợ</TableCell>
                            <TableCell align="left">Chi tiết hóa đơn</TableCell>
                            <TableCell align="left">Tác động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{ color: "white" }}>
                        {importOrders.map((importOrder) => (
                            <TableRow
                                key={importOrder._id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                            <TableCell align="left">{importOrder._id}</TableCell>
                            <TableCell align="left">{numberWithCommas(importOrder.totalBill)}</TableCell>
                            <TableCell align="left">{formatDate(importOrder.createdAt)}</TableCell>
                            <TableCell align="left">{importOrder.loan}</TableCell>
                            <TableCell align="left">{importOrder.duration}</TableCell>
                            <TableCell align="left">
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        <FontAwesomeIcon icon={faCircleInfo} /> Chi tiết
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {
                                            importOrder.details.map(detail => (
                                                <Dropdown.Item onClick={() => handleTableFormShow(detail)}>{detail.product.name}</Dropdown.Item>
                                            ))
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                            </TableCell>
                            <TableCell align="left" >
                                <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Hành động
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item ></Dropdown.Item>
                                    <Dropdown.Item onClick={() => {}}>
                                    Cập nhật
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => {}}>Xóa</Dropdown.Item>
                                </Dropdown.Menu>
                                </Dropdown>
                            </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
            <CreateImportOrder
                isShow={showCreateForm}
                onCreateImportOrder={handleCreateImportOrder}
                onCloseCreateform={handleCreateFormClose}
            />
            <ImportOrderDetailTable
                isShow={showTableForm}
                onTableFormClose={handleTableFormClose}
                activeImportOrderDetail={activeImportOrderDetail}
            />
        </>
    );
}

export default ImportOrderTable;