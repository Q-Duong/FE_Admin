import React, { useEffect, useState } from 'react';
import { supplierAPI } from '../../../axios/exeAPI';
import CreateSupplierForm from '../CreateSupplierForm/CreateSupplierForm';
import DeleteSupplierForm from '../DeleteSupplierForm/DeleteSupplierForm';
import UpdateSupplierForm from '../UpdateSupplierForm/UpdateSupplierForm';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./SupplierTable.css";
import MyPagination from '../../Pagination/Pagination';

import { Button, Dropdown } from "react-bootstrap";

function SupplierTable() {
    const [suppliers, setSuppliers] =
        useState([{_id:"123",name:"???",address: "???",phone: "???",product: "???"}]);
    const [activeSupplier, setactiveSupplier] = 
        useState([{_id:"123",name:"???",address: "???",phone: "???",product: "???"}]);
    const [paginationOptions, setPaginationOptions] = useState({});
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [activePage, setActivePage] = useState(1)

    function handleUpdateFormClose ()  {
        setShowUpdateForm(false)
      };

    function handleUpdateFormShow(supplier) {
        setactiveSupplier(supplier)
        setShowUpdateForm(true)
    };
    
    function handleCreateFormClose ()  {
        setShowCreateForm(false)
      };

    function handleCreateFormShow() {
        setShowCreateForm(true)
    };

    function handleDeleteFormClose ()  {
        setShowDeleteForm(false)
      };

    function handleDeleteFormShow(supplier) {
        setactiveSupplier(supplier)
        setShowDeleteForm(true)
    };

    async function handleCreateSupplier(formRef) {
        try {
            const createSupplierForm = formRef.current
            const formData = new FormData(createSupplierForm)
            const formObject =Object.fromEntries(formData)
            formObject.products = formData.getAll('products')

            const data = JSON.stringify(formObject)
            const res = await supplierAPI.create(data)
            if(res.status === 201){
                let tempSuppliers = [...suppliers];
                tempSuppliers.unshift(res.data)
                setSuppliers(tempSuppliers);
                setShowCreateForm(false)
            }
            else{
                console.log(res.data.message)
            }
        } catch (error) {
            console.log(error)
        }  
    }
        
    async function handleUpdatedSupplier(formRef){
        try {
            const supplierId = activeSupplier._id
            const updateForm = formRef.current
            const updateFormData = new FormData(updateForm)
            const updateFormObject = Object.fromEntries(updateFormData)
            updateFormObject.products =  updateFormData.getAll('products')

            const data = JSON.stringify(updateFormObject)
            const res = await supplierAPI.update(supplierId, data);
            if(res.status === 200){
                let tempSuppliers = [...suppliers];
                const updatedSupplier = res.data;
                tempSuppliers = tempSuppliers.map(supplier => supplier._id === updatedSupplier._id ? updatedSupplier : supplier);
                setSuppliers(tempSuppliers);
                setShowUpdateForm(false)
            }
            else{
                console.log(res.data.message)
            }
        } catch (error) {
            console.log(error)
        }  
    }


    async function handleDeleteSupplier(id) {
        try {
            const res = await supplierAPI.delete(id);
            const deletedSupplier = res.data;
            if(res.status === 200){
                let tempSuppliers = [...suppliers];
                tempSuppliers = tempSuppliers.filter(supplier => supplier._id !== deletedSupplier._id)
                setSuppliers(tempSuppliers);
                setShowDeleteForm(false);
            }
            else{
                console.log(res.data.message)
            }
        } catch (error) {
            console.log(error)
        }  
    };

    function handlePageChange(newPage) {
        if(newPage > 0)
            setActivePage(newPage)
    }

    useEffect(()=> {
        async function getSuppliers() {
            const suppliers = await supplierAPI.getAll(activePage);
            console.log(suppliers.data)
            setSuppliers(suppliers.data.docs);
            setPaginationOptions({...suppliers.data})
        }
        getSuppliers()
        
    },[activePage])
    
    return (
        <>
        <div className="Table">
            <h3>Nhà cung cấp</h3>
            <Button variant="primary" onClick={handleCreateFormShow}>
                Thêm
            </Button>
            <TableContainer
                component={Paper}
                style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
                className="a"
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                    <TableHead>
                    <TableRow>
                        
                        <TableCell align="left">Tên nhà cung cấp</TableCell>
                        <TableCell align="left">Địa chỉ</TableCell>
                        <TableCell align="left">SĐT</TableCell>
                        <TableCell align="left">Sản phẩm cung cấp</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody style={{ color: "white" }}>
                        {suppliers.map((supplier) => (
                            <TableRow
                                key={supplier._id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                           
                            <TableCell align="left">{supplier.name}</TableCell>
                            <TableCell align="left">{supplier.address}</TableCell>
                            <TableCell align="left">{supplier.phone}</TableCell>
                            <TableCell align="left">{
                                supplier.products ?
                                supplier.products.map((product) =>  (<p>{product.name}</p>))
                                : <></>
                            }</TableCell>
                            <TableCell align="left" className="Details">
                                <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Hành động
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item ></Dropdown.Item>
                                    <Dropdown.Item onClick={() => {handleUpdateFormShow(supplier)}}>
                                    Cập nhật
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => {handleDeleteFormShow(supplier)}}>Xóa</Dropdown.Item>
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
            <CreateSupplierForm
                isShow={showCreateForm}
                onCreateSupplier={handleCreateSupplier}
                onCloseCreateform={handleCreateFormClose}
            />
            <UpdateSupplierForm 
                activeSupplier={activeSupplier}
                isShow={showUpdateForm}
                onUpdateSupplier={handleUpdatedSupplier}
                onCloseUpdateform={handleUpdateFormClose}
            />
            <DeleteSupplierForm
                activeSupplier={activeSupplier}
                isShow={showDeleteForm}
                onDeleteSupplier={handleDeleteSupplier}
                onCloseDeleteform={handleDeleteFormClose}
            />
        </>
    );
}

export default SupplierTable;