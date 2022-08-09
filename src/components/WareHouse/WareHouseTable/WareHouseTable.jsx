import React, { useEffect, useState } from 'react';
import { wareHouseAPI } from '../../../axios/exeAPI';

import DeleteWareHouseForm from '../DeleteWareHouseForm/DeleteWareHouseForm';
import UpdateWareHouseForm from '../UpdateWareHouseForm/UpdateWareHouseForm';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./WareHouseTable.css";
import numberWithCommas from '../../../utils/numberWithCommas';
import formatDate from '../../../utils/formatDate';
import { Button, Col, Dropdown, Row, Form } from 'react-bootstrap';
import MyPagination from '../../Pagination/Pagination';

function WareHouseTable() {
    const [wareHouses, setWareHouses] = useState([]);
    const [paginationOptions, setPaginationOptions] = useState({})
    const [filterOptions, setFilterOptions] = useState({})
    const [activeWareHouse, setactiveWareHouse] = useState(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [activePage, setActivePage] = useState(1)

    function handleUpdateFormClose() {
        setShowUpdateForm(false)
    };

    function handleUpdateFormShow(wareHouse) {
        setactiveWareHouse(wareHouse)
        console.log(wareHouse)
        setShowUpdateForm(true)
    };


    function handleDeleteFormClose() {
        setShowDeleteForm(false)
    };

    function handleDeleteFormShow(wareHouse) {
        setactiveWareHouse(wareHouse)
        setShowDeleteForm(true)
    };



    async function handleUpdatedWareHouse(formRef) {
        try {
            const wareHouseId = activeWareHouse._id
            const productId = activeWareHouse.product._id
            const updateForm = formRef.current
            const updateFormData = new FormData(updateForm)
            const updateFormObject = Object.fromEntries(updateFormData)
            // updateFormObject.products =  updateFormData.getAll('products')

            const data = JSON.stringify(updateFormObject)
            const res = await wareHouseAPI.update({ wareHouseId, productId, wareHouse: data });
            let tempWareHouses = [...wareHouses];
            const updatedWareHouse = res.data;
            tempWareHouses = tempWareHouses.map(wareHouse => wareHouse._id === updatedWareHouse._id ? updatedWareHouse : wareHouse);
            setWareHouses(tempWareHouses);
            setShowUpdateForm(false)
        } catch (error) {
            alert(error.response.data.message)
        }
    }


    async function handleDeleteWareHouse(id) {
        try {
            const res = await wareHouseAPI.delete(id);
            const deletedWareHouse = res.data;
            if (res.status === 200) {
                let tempWareHouses = [...wareHouses];
                tempWareHouses = tempWareHouses.filter(wareHouse => wareHouse._id !== deletedWareHouse._id)
                setWareHouses(tempWareHouses);
                setShowDeleteForm(false);
            }
            else {
                console.log(res.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    };

    function handlePageChange(newPage) {
        if (newPage > 0)
            setActivePage(newPage)
    }

    async function handleFilterSubmit(e) {
        try {
            e.preventDefault()
            const filterForm = e.target
            const filterFormData = new FormData(filterForm)

            const filterObj = {};
            filterFormData.forEach((value, key) => filterObj[key] = value);
            setFilterOptions(filterObj)

        } catch (error) {
            alert(error.response.data.message)
        }
    }

    useEffect(() => {
        async function getWareHouses() {
            const wareHouses = await wareHouseAPI.getAll(activePage,filterOptions);
            setWareHouses(wareHouses.data.docs);
            setactiveWareHouse(wareHouses.data.docs[0])
            setPaginationOptions({ ...wareHouses.data })
            if(activePage != wareHouses.data.page)
                setActivePage(wareHouses.data.page)
        }
        getWareHouses()
    }, [activePage,filterOptions])

    return (
        <>
            <div className="Table">
                <h3>Kho hàng</h3>
                <Row>
                    <Form className="FormFilter" onSubmit={(e) => handleFilterSubmit(e)}>
                        <Col lg="12" xs="12">
                            <div className="filter_title">Bộ lọc</div>
                        </Col>
                        <Col lg="4" xs="12">
                            <div className="filter-name">
                                <input type="text" name="name" placeholder="Tên sản phẩm" className="input_name" />
                            </div>
                        </Col>
                        <Col lg="3" xs="12">
                            <Col lg="6" xs="6" className="display">
                                <div className="filter-date">
                                    <input type="date" name="fromDate" placeholder="Tên sản phẩm" className="input_date" />
                                </div>
                            </Col>
                            <Col lg="6" xs="6" className="display">
                                <div className="filter-date">
                                    <input type="date" name="toDate" placeholder="Tên sản phẩm" className="input_date" />
                                </div>
                            </Col>
                        </Col>
                        <Col lg="4" xs="12">
                            <div className="filter-active">
                                <div class='py'>
                                    <label className="label-left">
                                        <input type="radio" class="option-input radio" name="active" value='' />
                                        Tất cả
                                    </label>
                                    <label className="label-left">
                                        <input type="radio" class="option-input radio" name="active" value={true}/>
                                        Đang bán
                                    </label>
                                    <label className="label-left">
                                        <input type="radio" class="option-input radio" name="active" value={false} />
                                        Chưa bán
                                    </label>

                                </div>
                            </div>
                        </Col>
                        <Col lg="1" xs="12">
                            <div className="filter-button">
                                <Button type="submit" className="fil-button">Lọc</Button>
                            </div>
                        </Col>
                    </Form>
                </Row>
                <TableContainer
                    component={Paper}
                    style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
                    className="a"
                >

                    <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Mã lô</TableCell>
                                <TableCell align="left">Tên sản phẩm</TableCell>
                                <TableCell align="left">Ngày nhập</TableCell>
                                <TableCell align="left">Ngày hết hạn</TableCell>
                                <TableCell align="left">Giá nhập</TableCell>
                                <TableCell align="left">Giá bán</TableCell>
                                <TableCell align="left">SL nhập</TableCell>
                                <TableCell align="left">SL bán</TableCell>
                                <TableCell align="left">Trạng thái</TableCell>
                                <TableCell align="left">Tác động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{ color: "white" }}>
                            {wareHouses.map((wareHouse) => (
                                <TableRow
                                    key={wareHouse._id}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell align="left">{wareHouse._id}</TableCell>
                                    <TableCell align="left">{wareHouse.product.name}</TableCell>
                                    <TableCell align="left">{formatDate(wareHouse.manufacturingDate)}</TableCell>
                                    <TableCell align="left">{formatDate(wareHouse.expireIn)}</TableCell>
                                    <TableCell align="left">{numberWithCommas(wareHouse.stockPrice)}</TableCell>
                                    <TableCell align="left">{wareHouse.soldPrice > 0 ? numberWithCommas(wareHouse.soldPrice) : 'chưa có giá bán'}</TableCell>
                                    <TableCell align="left">{wareHouse.stockQuantity}</TableCell>
                                    <TableCell align="left">{wareHouse.soldQuantity}</TableCell>
                                    <TableCell align="left">{wareHouse.active ? 'đã được bán' : 'chưa được bán'}</TableCell>
                                    <TableCell align="left" className="Details">
                                        <Dropdown>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                Hành động
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item ></Dropdown.Item>
                                                <Dropdown.Item onClick={() => { handleUpdateFormShow(wareHouse) }}>
                                                    Cập nhật
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => { handleDeleteFormShow(wareHouse) }}>Xóa</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <MyPagination paginationOptions={paginationOptions} onPageChange={handlePageChange} />
                </TableContainer>
            </div>

            <UpdateWareHouseForm
                activeWareHouse={activeWareHouse}
                isShow={showUpdateForm}
                onUpdateWareHouse={handleUpdatedWareHouse}
                onCloseUpdateform={handleUpdateFormClose}
            />
            <DeleteWareHouseForm
                activeWareHouse={activeWareHouse}
                isShow={showDeleteForm}
                onDeleteWareHouse={handleDeleteWareHouse}
                onCloseDeleteform={handleDeleteFormClose}
            />
        </>
    );
}

export default WareHouseTable;