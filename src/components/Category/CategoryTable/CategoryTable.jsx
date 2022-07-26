import React, { useEffect, useState } from 'react';
import { categoryAPI } from '../../../axios/exeAPI';
import CreateCategoryForm from '../CreateCategoryForm/CreateCategoryForm';
import DeleteCategoryForm from '../DeleteCategoryForm/DeleteCategoryForm';
import UpdateCategoryForm from '../UpdateCategoryForm/UpdateCategoryForm';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./CategoryTable.css";

import { Button, Dropdown } from "react-bootstrap";
import ProtectedRoute from '../../ProtectedRoute/ProtectedRoute';

function CategoryTable() {
    const [categories, setCategories] =
        useState([{_id:"123",name:"???",image: "???"}]);
    const [activeCategory, setactiveCategory] = 
        useState({_id:"123",name:"???",image: "???"});
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);

    function handleUpdateFormClose ()  {
        setShowUpdateForm(false)
      };

    function handleUpdateFormShow(category) {
        setactiveCategory(category)
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

    function handleDeleteFormShow(category) {
        setactiveCategory(category)
        setShowDeleteForm(true)
    };
        
    async function handleUpdatedCategory(formRef){
        const updateForm = formRef.current
        const updateFormData = new FormData(updateForm)
        updateFormData.append('_id',activeCategory._id)
        const response = await categoryAPI.update(updateFormData);
        const updatedCategory = response.data;
        let tempCategories = [...categories];
        tempCategories = tempCategories.map(category => category._id === updatedCategory._id ? updatedCategory : category);
        setCategories(tempCategories);
        setShowUpdateForm(false)
    }

    async function handleCreateCategory(formRef){
        const createForm = formRef.current
        const createFormData = new FormData(createForm)
        const response = await categoryAPI.create(createFormData);
        const createdCategory = response.data;
        let tempCategories = [...categories];
        tempCategories.unshift(createdCategory)
        setCategories(tempCategories);
        setShowCreateForm(false)
    }

    async function handleDeleteCategory(id) {
        const response = await categoryAPI.delete(id);
        const deletedCategory = response.data;
        let tempCategories = [...categories];
        tempCategories = tempCategories.filter(category => category._id !== deletedCategory._id)
        setCategories(tempCategories);
        setShowDeleteForm(false);
    };

    useEffect(()=> {
        async function getCategories() {
            const categories = await categoryAPI.getAll();
            setCategories(categories.data);
        }
        getCategories()
        
    },[])
    
    return (
        <>
        <div className="Table">
            <h3>Danh mục sản phẩm</h3>
            <ProtectedRoute permission={"create_categories"}>
                <Button variant="primary" onClick={handleCreateFormShow}>
                    Thêm
                </Button>
            </ProtectedRoute>
            <TableContainer
                component={Paper}
                style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
                className="a"
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                    <TableHead>
                    <TableRow>
                        <TableCell align="left">Tên danh mục</TableCell>
                        <TableCell align="left">Logo</TableCell>
                        <TableCell align="left">Tác động</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody style={{ color: "white" }}>
                        {categories.map((category) => (
                            <TableRow
                                key={category._id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                            <TableCell align="left">{category.name}</TableCell>
                            <TableCell align="left"><img className="imageCategory" src={`https://res.cloudinary.com/anhtuanpham1507/image/upload/v1616603933/${category.image}`} /></TableCell>

                            <TableCell align="left" className="Details">
                                <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Hành động
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item ></Dropdown.Item>
                                    <ProtectedRoute permission={"update_categories"}>
                                        <Dropdown.Item onClick={() => {handleUpdateFormShow(category)}}>
                                            Cập nhật
                                        </Dropdown.Item>
                                    </ProtectedRoute>
                                    <ProtectedRoute permission={"delete_categories"}>
                                        <Dropdown.Item onClick={() => {handleDeleteFormShow(category)}}>
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
            <CreateCategoryForm
                isShow={showCreateForm}
                onCreateCategory={handleCreateCategory}
                onCloseCreateform={handleCreateFormClose}
            />
            <UpdateCategoryForm 
                activeCategory={activeCategory}
                isShow={showUpdateForm}
                onUpdateCategory={handleUpdatedCategory}
                onCloseUpdateform={handleUpdateFormClose}
            />
            <DeleteCategoryForm
                activeCategory={activeCategory}
                isShow={showDeleteForm}
                onDeleteCategory={handleDeleteCategory}
                onCloseDeleteform={handleDeleteFormClose}
            />
        </>
    );
}

export default CategoryTable;