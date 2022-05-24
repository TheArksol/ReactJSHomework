import React, { useState } from "react";
import styles from "./todoList.module.css";

import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const ToDoList = () => {
  const [taskMap, setTaskMap] = useState(new Map());
  const rows = [];

  const [category, setCategory] = React.useState("");

  function categoryChange(e) {
    console.log(e.target.value);
    setCategory(e.target.value);
  }

  function createData(name, category) {
    return { name, category };
  }

  function addNewTask() {
    const inputTaskName = document.getElementById("textfield_Name");

    //Check if the input value is not only whitespace
    if (inputTaskName.value.replace(/\s+/g, "") != "" && category != "") {
      rows.push(createData(inputTaskName.value, category));
      setTaskMap(new Map(taskMap.set(rows)));
      console.log(taskMap);
    }
  }

  return (
    <div className={styles.todoContainer}>
      <div className={styles.todoInputContainer}>
        <TextField
          id="textfield_Name"
          label="Task name"
          variant="standard"
        ></TextField>

        <FormControl >
        <InputLabel>Category</InputLabel>
          <Select sx={{minWidth: 140}} label="Category" value={category} onChange={categoryChange}>
            <MenuItem value={"Work"}>Work</MenuItem>
            <MenuItem value={"Housework"}>Housework</MenuItem>
            <MenuItem value={"Appointment"}>Appointment</MenuItem>
          </Select>
        </FormControl>

        <div>
          <Button onClick={addNewTask} variant="contained">
            Add
          </Button>
        </div>
      </div>

      <div className={styles.todoTableContainer}>
        <TableContainer maxHeight sx={{ maxHeight: 650}}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="ToDo Table">
            <TableHead>
              <TableRow>
                <TableCell>Task name</TableCell>
                <TableCell align="right">Category</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...taskMap.keys()].map((row) => (
                <TableRow
                  key={row[0].name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row[0].name}
                  </TableCell>
                  <TableCell align="right">{row[0].category}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ToDoList;
