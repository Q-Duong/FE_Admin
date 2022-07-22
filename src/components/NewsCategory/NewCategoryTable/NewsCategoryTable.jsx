import React, { useEffect, useState } from 'react';
import { NewsCategoryAPI } from '../../../axios/exeAPI';
import CreateNewsCategoryForm from '../CreateNewsCategoryForm/CreateNewsCategoryForm';
import DeleteNewsCategoryForm from '../DeleteNewsCategoryForm/DeleteNewsCategoryForm';
import UpdateNewsCategoryForm from '../UpdateNewsCategoryForm/UpdateNewsCategoryForm';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../../../CSS/Table.css";

import { Button, Dropdown } from "react-bootstrap";
import { TablePagination } from '@mui/material';
import ProtectedRoute from '../../ProtectedRoute/ProtectedRoute';

function NewsCategoryTable() {
    const [NewsCategorys, setNewsCategorys] =
        useState([{ _id: "123", name: "???", image: "???" }]);
    const [activeNewsCategory, setactiveNewsCategory] =
        useState({ _id: "123", name: "???", image: "???" });
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);

    function handleUpdateFormClose() {
        setShowUpdateForm(false)
    };

    function handleUpdateFormShow(NewsCategory) {
        setactiveNewsCategory(NewsCategory)
        setShowUpdateForm(true)
    };

    function handleCreateFormClose() {
        setShowCreateForm(false)
    };

    function handleCreateFormShow() {
        setShowCreateForm(true)
    };

    function handleDeleteFormClose() {
        setShowDeleteForm(false)
    };

    function handleDeleteFormShow(NewsCategory) {
        setactiveNewsCategory(NewsCategory)
        setShowDeleteForm(true)
    };

    async function handleUpdatedNewsCategory(formRef) {
        const updateForm = formRef.current
        const updateFormData = new FormData(updateForm)
        updateFormData.append('_id', activeNewsCategory._id)
        const response = await NewsCategoryAPI.update(updateFormData);
        const updatedNewsCategory = response.data;
        let tempNewsCategorys = [...NewsCategorys];
        console.log(updatedNewsCategory)
        tempNewsCategorys = tempNewsCategorys.map(NewsCategory => NewsCategory._id === updatedNewsCategory._id ? updatedNewsCategory : NewsCategory);
        setNewsCategorys(tempNewsCategorys);
        setShowUpdateForm(false)
    }

    async function handleCreateNewsCategory(formRef) {
        const createForm = formRef.current
        const createFormData = new FormData(createForm)
        const response = await NewsCategoryAPI.create(createFormData);
        const createdNewsCategory = response.data;
        let tempNewsCategorys = [...NewsCategorys];
        tempNewsCategorys.unshift(createdNewsCategory)
        setNewsCategorys(tempNewsCategorys);
        setShowCreateForm(false)
    }

    async function handleDeleteNewsCategory(id) {
        const response = await NewsCategoryAPI.delete(id);
        const deletedNewsCategory = response.data;
        let tempNewsCategorys = [...NewsCategorys];
        tempNewsCategorys = tempNewsCategorys.filter(NewsCategory => NewsCategory._id !== deletedNewsCategory._id)
        setNewsCategorys(tempNewsCategorys);
        setShowDeleteForm(false);
    };

    useEffect(() => {
        async function getNewsCategorys() {
            const NewsCategorys = await NewsCategoryAPI.getAll();
            setNewsCategorys(NewsCategorys.data);
        }
        getNewsCategorys()

    }, [])

    return (
        <>
            <div className="Table">
                <h3>Tin tức</h3>
                <ProtectedRoute permission="create_NewsCategorys">
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
                                <TableCell align="left">Tên tin tức</TableCell>
                                <TableCell align="left">Logo</TableCell>
                                <TableCell align="left">Tác động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{ color: "white" }}>
                            {NewsCategorys.map((NewsCategory) => (
                                <TableRow
                                    key={NewsCategory._id}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell align="left">{NewsCategory.name}</TableCell>
                                    <TableCell align="left"><img src={`https://res.cloudinary.com/anhtuanpham1507/image/upload/v1616603933/${NewsCategory.image}`} /></TableCell>

                                    <TableCell align="left" className="Details">
                                        <Dropdown>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                Hành động
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item ></Dropdown.Item>
                                                <Dropdown.Item onClick={() => { handleUpdateFormShow(NewsCategory) }}>
                                                    Cập nhật
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => { handleDeleteFormShow(NewsCategory) }}>Xóa</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </TableContainer>


            </div>
            <CreateNewsCategoryForm
                isShow={showCreateForm}
                onCreateNewsCategory={handleCreateNewsCategory}
                onCloseCreateform={handleCreateFormClose}
            />
            <UpdateNewsCategoryForm
                activeNewsCategory={activeNewsCategory}
                isShow={showUpdateForm}
                onUpdateNewsCategory={handleUpdatedNewsCategory}
                onCloseUpdateform={handleUpdateFormClose}
            />
            <DeleteNewsCategoryForm
                activeNewsCategory={activeNewsCategory}
                isShow={showDeleteForm}
                onDeleteNewsCategory={handleDeleteNewsCategory}
                onCloseDeleteform={handleDeleteFormClose}
            />
        </>
    );
}

export default NewsCategoryTable;