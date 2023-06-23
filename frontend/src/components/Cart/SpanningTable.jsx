import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RemoveIcon from "@mui/icons-material/Remove";
import CartStyles from "./Cart.module.css";

const TAX_RATE = 0.21;

function ccyFormat(num) {
  if (typeof num === "undefined") {
    return ""; // or any other default value you prefer
  }
  return `${num.toFixed(2)}`;
}

function createRow(id, desc, qty, basePrice) {
  const totalPrice = qty * basePrice;
  return { id, desc, qty, basePrice, totalPrice };
}

function subtotal(items) {
  return items.reduce((sum, item) => sum + item.totalPrice, 0);
}

export default function SpanningTable({ cart, handleDelete }) {
  const rows = cart.map((item) =>
    createRow(
      item._id,
      item.foodName,
      item.amount,
      item.foodPrice / item.amount
    )
  );

  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: "auto" }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            {/* <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Actions</TableCell> */}
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Service</b>
            </TableCell>
            <TableCell align="right">
              <b>Quantity</b>
            </TableCell>
            <TableCell align="right">
              <b>Price per service</b>
            </TableCell>
            <TableCell align="right">
              <b>Total Price</b>
            </TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.desc}</TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{ccyFormat(row.basePrice)}</TableCell>
              <TableCell align="right">{ccyFormat(row.totalPrice)}</TableCell>
              <TableCell align="right">
                <RemoveIcon
                  onClick={() => handleDelete(row.id)}
                  className={CartStyles.remove}
                />
              </TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
              0
            )} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
