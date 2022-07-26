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
import { Button, Col, Dropdown, Row } from 'react-bootstrap';
import ProtectedRoute from '../../ProtectedRoute/ProtectedRoute';

function WareHouseTable() {
    const [wareHouses, setWareHouses] =useState([]);
    const [activeWareHouse, setactiveWareHouse] = useState(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);


    function handleUpdateFormClose ()  {
        setShowUpdateForm(false)
      };

    function handleUpdateFormShow(wareHouse) {
        setactiveWareHouse(wareHouse)
        console.log(wareHouse)
        setShowUpdateForm(true)
    };
    

    function handleDeleteFormClose ()  {
        setShowDeleteForm(false)
      };

    function handleDeleteFormShow(wareHouse) {
        setactiveWareHouse(wareHouse)
        console.log(wareHouse)
        setShowDeleteForm(true)
    };

    
        
    async function handleUpdatedWareHouse(formRef){
        try {
            const wareHouseId = activeWareHouse._id
            const productId = activeWareHouse.product._id
            const updateForm = formRef.current
            const updateFormData = new FormData(updateForm)
            const updateFormObject = Object.fromEntries(updateFormData)
            // updateFormObject.products =  updateFormData.getAll('products')

            const data = JSON.stringify(updateFormObject)
            const res = await wareHouseAPI.update({wareHouseId,productId, wareHouse: data});
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
            if(res.status === 200){
                let tempWareHouses = [...wareHouses];
                tempWareHouses = tempWareHouses.filter(wareHouse => wareHouse._id !== deletedWareHouse._id)
                setWareHouses(tempWareHouses);
                setShowDeleteForm(false);
            }
            else{
                console.log(res.data.message)
            }
        } catch (error) {
            console.log(error)
        }  
    };

    useEffect(()=> {
        async function getWareHouses() {
            const wareHouses = await wareHouseAPI.getAll();
            console.log(wareHouses.data)
            setWareHouses(wareHouses.data);
            setactiveWareHouse(wareHouses.data[0])
        }
        getWareHouses()
        
    },[])
    
    return (
        <>
        <div className="Table">
            <h3>Kho hàng</h3>
                <div className="filter">
                    <Row>
                        <Col lg="12" xs="12">
                            <div className="filter_title">Bộ lọc</div>
                        </Col>
                        <Col lg="4" xs="12">
                            <div className="filter-name">
                                
                                <input type="text"  name="" placeholder="Tên sản phẩm" className="input_name" />
                            </div>
                        </Col>
                        <Col lg="2" xs="6">
                            <div className="filter-date">
                                <input type="date" name="manufacturingDate" placeholder="Tên sản phẩm" className="input_date" />
                            </div>
                        </Col>
                        <Col lg="2" xs="6">
                            <div className="filter-date">
                                <input type="date" name="manufacturingDate" placeholder="Tên sản phẩm" className="input_date" />
                            </div>
                        </Col>
                        <Col lg="3" xs="12">
                            <div className="filter-active">
                                <div class='py'>
                                    <label className="label-left">
                                        <input type="radio" class="option-input radio" name="example" checked />
                                        Đang bán
                                    </label>
                                    <label>
                                        <input type="radio" class="option-input radio" name="example" />
                                        Chưa bán
                                    </label>
                                    
                                </div>
                            </div>
                        </Col>
                        <Col lg="1" xs="12">
                            <div className="filter-button">
                            <Button className="continue__btn">Lọc</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
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
                            <TableCell align="left">{formatDate(wareHouse.createdAt)}</TableCell>
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
                                    <ProtectedRoute permission={"update_warehouses"}>
                                        <Dropdown.Item onClick={() => {handleUpdateFormShow(wareHouse)}}>
                                            Cập nhật
                                        </Dropdown.Item>
                                    </ProtectedRoute>
                                    <ProtectedRoute permission={"delete_warehouses"}>
                                        <Dropdown.Item onClick={() => {handleDeleteFormShow(wareHouse)}}>
                                            Xóa
                                        </Dropdown.Item>
                                    </ProtectedRoute>
                                </Dropdown.Menu>
                                </Dropdown>
                            </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
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