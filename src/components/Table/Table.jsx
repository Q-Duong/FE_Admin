import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import { Dropdown } from "react-bootstrap";

export default function BasicTable(props) {
  const {brands, onUpdateBrand, onDeleteBrand } = props
  
  function handleUpdateBrand(brand) {
    if(onUpdateBrand)
      onUpdateBrand(brand);
  }

  function handleDeleteBrand(id) {
    if(onDeleteBrand)
      onDeleteBrand(id);
  }
  return (
      <div className="Table">
      <h3>Recent Orders</h3>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
          className="a"
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table" >
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Image</TableCell>
                <TableCell align="left">Action</TableCell>
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
                  <TableCell align="left"><img src={brand.brandImage} /></TableCell>
                  <TableCell align="left" className="Details">
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Action
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item ></Dropdown.Item>
                        <Dropdown.Item onClick={() => {handleUpdateBrand(brand)}}>
                          Update
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => {handleDeleteBrand(brand._id)}}>Delete</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}
