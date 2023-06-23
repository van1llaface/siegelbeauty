import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function BasicTable({
  foods,
  handleAmountChange,
  handleAddToCart,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <TableContainer component={Paper} sx={{ height: "90%" }}>
      <Table
        sx={{
          minWidth: 650,
          ...(isMobile && {
            overflowX: "auto",
            overflowY: "auto",
            maxHeight: "300px",
          }), // Enable horizontal scrolling on mobile
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Service Name</TableCell>
            <TableCell align={isMobile ? "left" : "right"}>
              Description
            </TableCell>
            <TableCell align={isMobile ? "left" : "right"}>Price</TableCell>
            <TableCell align={isMobile ? "left" : "right"}>Amount</TableCell>
            <TableCell align={isMobile ? "left" : "right"}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {foods.map((food) => (
            <TableRow key={food.foodName}>
              <TableCell component="th" scope="row">
                {food.foodName}
              </TableCell>
              <TableCell align={isMobile ? "left" : "right"}>
                {food.description}
              </TableCell>
              <TableCell align={isMobile ? "left" : "right"}>
                {food.selectedPrice.toFixed(2)}
              </TableCell>
              <TableCell align={isMobile ? "left" : "right"}>
                <TextField
                  type="number"
                  defaultValue={1}
                  min={1}
                  onChange={(event) => handleAmountChange(event, food)}
                />
              </TableCell>
              <TableCell align={isMobile ? "left" : "right"}>
                <Button onClick={() => handleAddToCart(food)}>
                  <AddIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
