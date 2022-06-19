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

import { Button, Dropdown } from "react-bootstrap";

function SupplierTable() {
    const [suppliers, setSuppliers] =
        useState([{_id:"123",supplierName:"???",address: "???",phone: "???"}]);
    const [activeSupplier, setactiveSupplier] = 
        useState([{_id:"123",supplierName:"???",address: "???",phone: "???"}]);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);

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
        
    async function handleUpdatedSupplier(formRef){
        const updateForm = formRef.current
        const updateFormData = new FormData(updateForm)
        updateFormData.append('_id',activeSupplier._id)
        const response = await supplierAPI.update(updateFormData);
        const updatedSupplier = response.data;
        let tempSuppliers = [...suppliers];
        tempSuppliers = tempSuppliers.map(supplier => supplier._id === updatedSupplier._id ? updatedSupplier : supplier);
        setSuppliers(tempSuppliers);
        setShowUpdateForm(false)
    }

    async function handleCreateSupplier(formRef){
        const createForm = formRef.current
        const createFormData = new FormData(createForm)
        const response = await supplierAPI.create(createFormData);
        const createdSupplier = response.data;
        let tempSuppliers = [...suppliers];
        tempSuppliers.unshift(createdSupplier)
        setSuppliers(tempSuppliers);
        setShowCreateForm(false)
    }

    async function handleDeleteSupplier(id) {
        const response = await supplierAPI.delete(id);
        const deletedSupplier = response.data;
        let tempSuppliers = [...suppliers];
        tempSuppliers = tempSuppliers.filter(supplier => supplier._id !== deletedSupplier._id)
        setSuppliers(tempSuppliers);
        setShowDeleteForm(false);
    };

    useEffect(()=> {
        async function getSuppliers() {
            const suppliers = await supplierAPI.getAll();
            setSuppliers(suppliers.data);
        }
        getSuppliers()
        
    },[])
    
    return (
        <>
        <div className="Table">
            <h3>CURD Supplier</h3>
            <Button variant="primary" onClick={handleCreateFormShow}>
                Create Supplier
            </Button>
            <TableContainer
                component={Paper}
                style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
                className="a"
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                    <TableHead>
                    <TableRow>
                        <TableCell>Định danh</TableCell>
                        <TableCell align="left">Tên nhà cung cấp</TableCell>
                        <TableCell align="left">Địa chỉ</TableCell>
                        <TableCell align="left">SĐT</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody style={{ color: "white" }}>
                        {suppliers.map((supplier) => (
                            <TableRow
                                key={supplier._id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {supplier._id}
                            </TableCell>
                            <TableCell align="left">{supplier.supplierName}</TableCell>
                            <TableCell align="left">{supplier.address}</TableCell>
                            <TableCell align="left">{supplier.phone}</TableCell>
                            <TableCell align="left" className="Details">
                                <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Action
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item ></Dropdown.Item>
                                    <Dropdown.Item onClick={() => {handleUpdateFormShow(supplier)}}>
                                    Update
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => {handleDeleteFormShow(supplier)}}>Delete</Dropdown.Item>
                                </Dropdown.Menu>
                                </Dropdown>
                            </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
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