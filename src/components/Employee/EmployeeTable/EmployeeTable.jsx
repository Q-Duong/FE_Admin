import React, { useEffect, useState } from 'react';
import { employeeAPI } from '../../../axios/exeAPI';
import CreateEmployeeForm from '../CreateEmployeeForm/CreateEmployeeForm';
import DeleteEmployeeForm from '../DeleteEmployeeForm/DeleteEmployeeForm';
import UpdateEmployeeForm from '../UpdateEmployeeForm/UpdateEmployeeForm';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./EmployeeTable.css";

import { Button, Dropdown } from "react-bootstrap";

function EmployeeTable() {
    const [employees, setEmployees] =
        useState([{_id:"123",employeeName:"???",employeePhone: "???",employeeEmail: "???",employeeRole: "???",employeeActive: "???",employeePassword: "???"}]);
    const [activeEmployee, setactiveEmployee] = 
        useState([{_id:"123",employeeName:"???",employeePhone: "???",employeeEmail: "???",employeeRole: "???",employeeActive: "???",employeePassword: "???"}]);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);

    function handleUpdateFormClose ()  {
        setShowUpdateForm(false)
      };

    function handleUpdateFormShow(employee) {
        setactiveEmployee(employee)
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

    function handleDeleteFormShow(employee) {
        setactiveEmployee(employee)
        setShowDeleteForm(true)
    };
        
    async function handleUpdatedEmployee(formRef){
        const updateForm = formRef.current
        const updateFormData = new FormData(updateForm)
        updateFormData.append('_id',activeEmployee._id)
        const response = await employeeAPI.update(updateFormData);
        const updatedEmployee = response.data;
        let tempEmployees = [...employees];
        tempEmployees = tempEmployees.map(employee => employee._id === updatedEmployee._id ? updatedEmployee : employee);
        setEmployees(tempEmployees);
        setShowUpdateForm(false)
    }

    async function handleCreateEmployee(formRef){
        const createForm = formRef.current
        const createFormData = new FormData(createForm)
        const response = await employeeAPI.create(createFormData);
        const createdEmployee = response.data;
        let tempEmployees = [...employees];
        tempEmployees.unshift(createdEmployee)
        setEmployees(tempEmployees);
        setShowCreateForm(false)
    }

    async function handleDeleteEmployee(id) {
        const response = await employeeAPI.delete(id);
        const deletedEmployee = response.data;
        let tempEmployees = [...employees];
        tempEmployees = tempEmployees.filter(employee => employee._id !== deletedEmployee._id)
        setEmployees(tempEmployees);
        setShowDeleteForm(false);
    };

    useEffect(()=> {
        async function getEmployees() {
            const employees = await employeeAPI.getAll();
            setEmployees(employees.data);
        }
        getEmployees()
        
    },[])
    
    return (
        <>
        <div className="Table">
            <h3>CURD Employee</h3>
            <Button variant="primary" onClick={handleCreateFormShow}>
                Create Employee
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
                        <TableCell align="left">tên hãng</TableCell>
                        <TableCell align="left">Logo</TableCell>
                        <TableCell align="left">Tác động</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody style={{ color: "white" }}>
                        {employees.map((employee) => (
                            <TableRow
                                key={employee._id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {employee._id}
                            </TableCell>
                            <TableCell align="left">{employee.employeeName}</TableCell>
                            

                            <TableCell align="left" className="Details">
                                <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Action
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item ></Dropdown.Item>
                                    <Dropdown.Item onClick={() => {handleUpdateFormShow(employee)}}>
                                    Update
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => {handleDeleteFormShow(employee)}}>Delete</Dropdown.Item>
                                </Dropdown.Menu>
                                </Dropdown>
                            </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
            <CreateEmployeeForm
                isShow={showCreateForm}
                onCreateEmployee={handleCreateEmployee}
                onCloseCreateform={handleCreateFormClose}
            />
            <UpdateEmployeeForm 
                activeEmployee={activeEmployee}
                isShow={showUpdateForm}
                onUpdateEmployee={handleUpdatedEmployee}
                onCloseUpdateform={handleUpdateFormClose}
            />
            <DeleteEmployeeForm
                activeEmployee={activeEmployee}
                isShow={showDeleteForm}
                onDeleteEmployee={handleDeleteEmployee}
                onCloseDeleteform={handleDeleteFormClose}
            />
        </>
    );
}

export default EmployeeTable;