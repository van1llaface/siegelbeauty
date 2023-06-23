import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import BrushIcon from "@mui/icons-material/Brush";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import AdminStyles from "./Admin.module.css";

export default function IconBreadcrumbs() {
  return (
    <div>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          fontSize: "2rem",
          "@media (max-width: 768px)": {
            fontSize: "1rem",
          },
        }}
      >
        <Link to="menus">
          <MenuIcon fontSize="2rem" />
          Categories
        </Link>
        <Link to="foods">
          <BrushIcon fontSize="2rem" />
          Services
        </Link>
        <Link to="orders">
          <BookmarkBorderIcon fontSize="2rem" />
          Orders
        </Link>
      </Breadcrumbs>
    </div>
  );
}
