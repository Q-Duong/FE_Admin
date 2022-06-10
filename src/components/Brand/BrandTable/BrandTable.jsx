import React, { useEffect, useState } from 'react';
import { brandAPI } from '../../../axios/exeAPI';
import CreateBrandForm from '../CreateBrandForm/CreateBrandForm';
import DeleteBrandForm from '../DeleteBrandForm/DeleteBrandForm';
import UpdateBrandForm from '../UpdateBrandForm/UpdateBrandForm';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../../../CSS/Table.css";

import { Button, Dropdown } from "react-bootstrap";

function BrandTable() {
    const [brands, setBrands] =
        useState([{_id:"123",brandName:"???",brandImage: "???"}]);
    const [activeBrand, setactiveBrand] = 
        useState({_id:"123",brandName:"???",brandImage: "???"});
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);

    function handleUpdateFormClose ()  {
        setShowUpdateForm(false)
      };

    function handleUpdateFormShow(brand) {
        setactiveBrand(brand)
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

    function handleDeleteFormShow(brand) {
        setactiveBrand(brand)
        setShowDeleteForm(true)
    };
        
    async function handleUpdatedBrand(formRef){
        const updateForm = formRef.current
        const updateFormData = new FormData(updateForm)
        updateFormData.append('_id',activeBrand._id)
        const response = await brandAPI.update(updateFormData);
        const updatedBrand = response.data;
        let tempBrands = [...brands];
        tempBrands = tempBrands.map(brand => brand._id === updatedBrand._id ? updatedBrand : brand);
        setBrands(tempBrands);
        setShowUpdateForm(false)
    }

    async function handleCreateBrand(formRef){
        const createForm = formRef.current
        const createFormData = new FormData(createForm)
        const response = await brandAPI.create(createFormData);
        const createdBrand = response.data;
        let tempBrands = [...brands];
        tempBrands.unshift(createdBrand)
        setBrands(tempBrands);
        setShowCreateForm(false)
    }

    async function handleDeleteBrand(id) {
        const response = await brandAPI.delete(id);
        const deletedBrand = response.data;
        let tempBrands = [...brands];
        tempBrands.filter(brand => brand._id !== deletedBrand._id)
        setBrands(tempBrands);
        setShowDeleteForm(false);
    };

    useEffect(()=> {
        async function getBrands() {
            const brands = await brandAPI.getAll();
            setBrands(brands.data);
        }
        getBrands()
        
    },[])
    
    return (
        <>
        <div className="Table">
            <h3>CURD Brand</h3>
            <Button variant="primary" onClick={handleCreateFormShow}>
                Create Brand
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
                        {brands.map((brand) => (
                            <TableRow
                                key={brand._id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {brand._id}
                            </TableCell>
                            <TableCell align="left">{brand.brandName}</TableCell>
                            <TableCell align="left"><img src={`https://res.cloudinary.com/anhtuanpham1507/image/upload/v1616603933/${brand.brandImage}`} /></TableCell>

                            <TableCell align="left" className="Details">
                                <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Action
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item ></Dropdown.Item>
                                    <Dropdown.Item onClick={() => {handleUpdateFormShow(brand)}}>
                                    Update
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => {handleDeleteFormShow(brand)}}>Delete</Dropdown.Item>
                                </Dropdown.Menu>
                                </Dropdown>
                            </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
            <CreateBrandForm
                isShow={showCreateForm}
                onCreateBrand={handleCreateBrand}
                onCloseCreateform={handleCreateFormClose}
            />
            <UpdateBrandForm 
                activeBrand={activeBrand}
                isShow={showUpdateForm}
                onUpdateBrand={handleUpdatedBrand}
                onCloseUpdateform={handleUpdateFormClose}
            />
            <DeleteBrandForm
                activeBrand={activeBrand}
                isShow={showDeleteForm}
                onDeleteBrand={handleDeleteBrand}
                onCloseDeleteform={handleDeleteFormClose}
            />
        </>
    );
}

export default BrandTable;