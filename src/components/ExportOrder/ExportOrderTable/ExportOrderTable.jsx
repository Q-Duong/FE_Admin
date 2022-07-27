import React, { useEffect, useState } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./ExportOrderTable.css";
import { exportOrderAPI } from '../../../axios/exeAPI';
import { TableCell } from '@mui/material';
import numberWithCommas from '../../../utils/numberWithCommas';
import formatDate from '../../../utils/formatDate';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-bootstrap';
import ExportOrderDetailTable from '../ExportOrderDetailTable/ExportOrderDetailTable'
import MyPagination from '../../Pagination/Pagination';

function ExportOrderTable(props) {
    const [exportOrders, setExportOrder] = useState([]);
    const [showTableForm, setShowTableForm] = useState(false);
    const [paginationOptions, setPaginationOptions] = useState({});
    const [activeExportOrderDetail, setactiveExportOrderDetail] = useState(null);
    const [activePage, setActivePage] = useState(1)

    function handleTableFormClose() {
        setShowTableForm(false)
    }

    function handleTableFormShow(detail) {
        setactiveExportOrderDetail(detail)
        setShowTableForm(true)
    }

    function handlePageChange(newPage) {
        if(newPage > 0)
            setActivePage(newPage)
    }

    useEffect(()=> {
        async function getExportOrder() {
            try {
                const res = await exportOrderAPI.getAll(activePage);
                if(res.status === 200) {
                    console.log(res.data)
                    setExportOrder(res.data.docs);
                    setPaginationOptions({...res.data})
                } else{
                    console.log(res.data.message)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getExportOrder()
        
    },[activePage])

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
                            <TableCell align="left">Xem chi tiết đơn hàng</TableCell>
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
                            <TableCell align="left">
                                <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    <FontAwesomeIcon icon={faCircleInfo} /> Chi tiết
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {
                                        exportOrder.details.map(detail => (
                                            <Dropdown.Item onClick={() => handleTableFormShow(detail)}>{detail.product.name}</Dropdown.Item>
                                        ))
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                            </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <MyPagination paginationOptions={paginationOptions} onPageChange={handlePageChange}/>
            </TableContainer>
        </div>
        <ExportOrderDetailTable
            isShow={showTableForm}
            onTableFormClose={handleTableFormClose}
            activeExportOrderDetail={activeExportOrderDetail}
        />
        </>
    );
}

export default ExportOrderTable;