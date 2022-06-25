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

import { Button, Dropdown } from "react-bootstrap";

function WareHouseTable() {
    const [wareHouses, setWareHouses] =
        useState([]);
    const [activeSupplier, setactiveSupplier] = 
        useState([]);
    // const [showUpdateForm, setShowUpdateForm] = useState(false);
    // const [showDeleteForm, setShowDeleteForm] = useState(false);

    // function handleUpdateFormClose ()  {
    //     setShowUpdateForm(false)
    //   };

    // function handleUpdateFormShow(supplier) {
    //     setactiveSupplier(supplier)
    //     setShowUpdateForm(true)
    // };
    

    // function handleDeleteFormClose ()  {
    //     setShowDeleteForm(false)
    //   };

    // function handleDeleteFormShow(supplier) {
    //     setactiveSupplier(supplier)
    //     setShowDeleteForm(true)
    // };

    
        
    // async function handleUpdatedSupplier(formRef){
    //     try {
    //         const supplierId = activeSupplier._id
    //         const updateForm = formRef.current
    //         const updateFormData = new FormData(updateForm)
    //         const updateFormObject = Object.fromEntries(updateFormData)
    //         updateFormObject.products =  updateFormData.getAll('products')

    //         const data = JSON.stringify(updateFormObject)
    //         const res = await wareHouseAPI.update(supplierId, data);
    //         if(res.status === 200){
    //             let tempSuppliers = [...wareHouses];
    //             const updatedSupplier = res.data;
    //             tempSuppliers = tempSuppliers.map(supplier => supplier._id === updatedSupplier._id ? updatedSupplier : supplier);
    //             setWareHouses(tempSuppliers);
    //             setShowUpdateForm(false)
    //         }
    //         else{
    //             console.log(res.data.message)
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }  
    // }


    // async function handleDeleteSupplier(id) {
    //     try {
    //         const res = await wareHouseAPI.delete(id);
    //         const deletedSupplier = res.data;
    //         if(res.status === 200){
    //             let tempSuppliers = [...wareHouses];
    //             tempSuppliers = tempSuppliers.filter(supplier => supplier._id !== deletedSupplier._id)
    //             setWareHouses(tempSuppliers);
    //             setShowDeleteForm(false);
    //         }
    //         else{
    //             console.log(res.data.message)
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }  
    // };

    useEffect(()=> {
        async function getWareHouses() {
            const wareHouses = await wareHouseAPI.getAll();
            console.log(wareHouses.data)
            setWareHouses(wareHouses.data);
        }
        getWareHouses()
        
    },[])
    
    return (
        <>
        <div className="Table">
            <h3>Kho hàng</h3>
            
            <TableContainer
                component={Paper}
                style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
                className="a"
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                    <TableHead>
                    <TableRow>
                        
                        <TableCell align="left">Tên sản phẩm</TableCell>
                        <TableCell align="left">Ngày nhập</TableCell>
                        <TableCell align="left">Ngày hết hạn</TableCell>
                        <TableCell align="left">Giá nhập</TableCell>
                        <TableCell align="left">Giá bán</TableCell>
                        <TableCell align="left">SL nhập</TableCell>
                        <TableCell align="left">SL bán</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody style={{ color: "white" }}>
                        {wareHouses.map((wareHouse) => (
                            <TableRow
                                key={wareHouse._id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                           
                           <TableCell align="left">{wareHouse.product.name}</TableCell>
                            <TableCell align="left">{formatDate(wareHouse.createdAt)}</TableCell>
                            <TableCell align="left">{formatDate(wareHouse.expireIn)}</TableCell>
                            <TableCell align="left">{numberWithCommas(wareHouse.stockPrice)}</TableCell>
                            <TableCell align="left">{numberWithCommas(wareHouse.soldPrice)}</TableCell>
                            <TableCell align="left">{wareHouse.stockQuantity}</TableCell>
                            <TableCell align="left">{wareHouse.soldQuantity}</TableCell>
                            <TableCell align="left" className="Details">
                                <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Hành động
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {/* <Dropdown.Item ></Dropdown.Item>
                                    <Dropdown.Item onClick={() => {handleUpdateFormShow(wareHouse)}}>
                                    Cập nhật
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => {handleDeleteFormShow(wareHouse)}}>Xóa</Dropdown.Item> */}
                                </Dropdown.Menu>
                                </Dropdown>
                            </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
           
            {/* <UpdateWareHouseForm 
                activeSupplier={activeSupplier}
                isShow={showUpdateForm}
                onUpdateSupplier={handleUpdatedSupplier}
                onCloseUpdateform={handleUpdateFormClose}
            />
            <DeleteWareHouseForm
                activeSupplier={activeSupplier}
                isShow={showDeleteForm}
                onDeleteSupplier={handleDeleteSupplier}
                onCloseDeleteform={handleDeleteFormClose}
            /> */}
        </>
    );
}

export default WareHouseTable;