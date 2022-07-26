import React, { useEffect, useState } from 'react';
import { customerAPI } from '../../../axios/exeAPI';
import CreateCustomerForm from '../CreateCustomerForm/CreateCustomerForm';
import DeleteCustomerForm from '../DeleteCustomerForm/DeleteCustomerForm';
import UpdateCustomerForm from '../UpdateCustomerForm/UpdateCustomerForm';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./CustomerTable.css";

import { Button, Dropdown } from "react-bootstrap";
import ProtectedRoute from '../../ProtectedRoute/ProtectedRoute';

function CustomerTable() {
    const [customers, setCustomers] =
        useState([{_id:"123",name:"???",phone: "???",address: "???",email: "???",pasword: "???",customerActive: "???"}]);
    const [activeCustomer, setactiveCustomer] = 
        useState([{_id:"123",name:"???",phone: "???",address: "???",email: "???",pasword: "???",customerActive: "???"}]);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);

    function handleUpdateFormClose ()  {
        setShowUpdateForm(false)
      };

    function handleUpdateFormShow(customer) {
        setactiveCustomer(customer)
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

    function handleDeleteFormShow(customer) {
        setactiveCustomer(customer)
        setShowDeleteForm(true)
    };
        
    async function handleUpdatedCustomer(formRef){
        const updateForm = formRef.current
        const updateFormData = new FormData(updateForm)
        updateFormData.append('_id',activeCustomer._id)
        const response = await customerAPI.update(updateFormData);
        const updatedCustomer = response.data;
        let tempCustomers = [...customers];
        tempCustomers = tempCustomers.map(customer => customer._id === updatedCustomer._id ? updatedCustomer : customer);
        setCustomers(tempCustomers);
        setShowUpdateForm(false)
    }

    async function handleCreateCustomer(formRef){
        const createForm = formRef.current
        const createFormData = new FormData(createForm)
        const response = await customerAPI.create(createFormData);
        const createdCustomer = response.data;
        let tempCustomers = [...customers];
        tempCustomers.unshift(createdCustomer)
        setCustomers(tempCustomers);
        setShowCreateForm(false)
    }

    async function handleDeleteCustomer(id) {
        const response = await customerAPI.delete(id);
        const deletedCustomer = response.data;
        let tempCustomers = [...customers];
        tempCustomers = tempCustomers.filter(customer => customer._id !== deletedCustomer._id)
        setCustomers(tempCustomers);
        setShowDeleteForm(false);
    };

    useEffect(()=> {
        async function getCustomers() {
            const customers = await customerAPI.getAll();
            setCustomers(customers.data);
        }
        getCustomers()
        
    },[])
    
    return (
        <>
        <div className="Table">
            <h3>Khách hàng</h3>
           
            <TableContainer
                component={Paper}
                style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
                className="a"
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                    <TableHead>
                    <TableRow>
                        <TableCell align="left">Tên khách hàng</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="left">SĐT</TableCell>
                        <TableCell align="left">Địa chỉ</TableCell>
                        <TableCell align="left">Tình trạng</TableCell>
                        <TableCell align="left">Tác động</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody style={{ color: "white" }}>
                        {customers.map((customer) => (
                            <TableRow
                                key={customer._id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                            <TableCell align="left">{customer.name}</TableCell>
                            <TableCell align="left">{customer.email}</TableCell>
                            <TableCell align="left">{customer.phone}</TableCell>
                            <TableCell align="left">{customer.address}</TableCell>
                            <TableCell align="left">{customer.active ? "Hoạt động": "Khóa"}</TableCell>
                            
                            <TableCell align="left" className="Details">
                                <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Hành động
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item ></Dropdown.Item>
                                    <ProtectedRoute permission={"update_cutomers"}>
                                        <Dropdown.Item onClick={() => {handleUpdateFormShow(customer)}}>
                                        Cập nhật
                                        </Dropdown.Item>
                                    </ProtectedRoute>
                                    <ProtectedRoute permission={"delete_cutomers"}>
                                        <Dropdown.Item onClick={() => {handleDeleteFormShow(customer)}}>
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
            <CreateCustomerForm
                isShow={showCreateForm}
                onCreateCustomer={handleCreateCustomer}
                onCloseCreateform={handleCreateFormClose}
            />
            <UpdateCustomerForm 
                activeCustomer={activeCustomer}
                isShow={showUpdateForm}
                onUpdateCustomer={handleUpdatedCustomer}
                onCloseUpdateform={handleUpdateFormClose}
            />
            <DeleteCustomerForm
                activeCustomer={activeCustomer}
                isShow={showDeleteForm}
                onDeleteCustomer={handleDeleteCustomer}
                onCloseDeleteform={handleDeleteFormClose}
            />
        </>
    );
}

export default CustomerTable;