import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardStyles from "./Orders.module.css";
import AlertDialogSlide from "./Confirmation";
import ClearIcon from "@mui/icons-material/Clear";

export default function OutlinedCard({
  order,
  handleApprove,
  handleDecline,
  handleDelete,
}) {
  const foodNames = order.foods.map((food) => {
    return food.foodName;
  });

  const foodAmounts = order.foods.map((food) => {
    return food.foodAmount;
  });

  const foodPrices = order.foods.map((food) => {
    return food.foodPrice;
  });

  const card = (
    <React.Fragment>
      <CardContent sx={{ height: "200px" }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <span className={CardStyles.spans}>
            <span>User: {order.customerName}</span>
            <span
              className={
                order.status === "approved"
                  ? CardStyles.green
                  : order.status === "pending"
                  ? CardStyles.blue
                  : order.status === "declined"
                  ? CardStyles.red
                  : ""
              }
            >
              {order.status}
            </span>
          </span>
          <br />
          Email: {order.customerEmail}
        </Typography>
        <Typography variant="h5" component="div">
          Total: {order.totalPrice} &euro;
        </Typography>
        <div className={CardStyles.columns}>
          <div>
            <div>Service</div>
            {foodNames.map((food, index) => {
              return <div key={index}>{food}</div>;
            })}
          </div>
          <div>
            <div>Amount</div>
            {foodAmounts.map((food, index) => {
              return <div key={index}>{food}</div>;
            })}
          </div>
          <div>
            <div>Price</div>
            {foodPrices.map((food, index) => {
              return <div key={index}>{food.toFixed(2)}</div>;
            })}
          </div>
        </div>
      </CardContent>
      <CardActions>
        <AlertDialogSlide
          title="Approve Order"
          description="Are you sure you want to approve this order?"
          onConfirm={() => handleApprove(order._id)}
        >
          Approve
        </AlertDialogSlide>
        <AlertDialogSlide
          title="Decline Order"
          description="Are you sure you want to decline this order?"
          onConfirm={() => handleDecline(order._id)}
        >
          Decline
        </AlertDialogSlide>
        <AlertDialogSlide
          title="Delete Order"
          description="Are you sure you want to delete this order?"
          onConfirm={() => handleDelete(order._id)}
        >
          <ClearIcon />
        </AlertDialogSlide>
      </CardActions>
    </React.Fragment>
  );
  return (
    <Box
      sx={{
        minWidth: "275px",
      }}
    >
      <Card variant="outlined" className={CardStyles.shadow}>
        {card}
      </Card>
    </Box>
  );
}
