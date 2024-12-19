import React, { Component, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuMenu, MenuItem, Menu, Segment } from "semantic-ui-react";
import { AuthContext } from "../context/authContext";

function MenuBar() {
  const [activeItem, setActiveItem] = useState("home");
  const { user , logout } = useContext(AuthContext);
  console.log("user" , user)

  const navigate = useNavigate();

  const MenuBar = (
    <Menu pointing secondary>
      <MenuItem
        name="home"
        active={activeItem === "home"}
        onClick={() => navigate("/")}
      />
      {user ? (
        <MenuMenu position="right">
          {/* <MenuItem
            name={user.username}
            active={activeItem === "user"}
          /> */}
          <MenuItem
            name="logout"
            onClick={logout}
          />
        </MenuMenu>
      ) : (
        <MenuMenu position="right">
          <MenuItem
            name="login"
            active={activeItem === "login"}
            onClick={() => navigate("/login")}
          />
          <MenuItem
            name="register"
            active={activeItem === "register"}
            onClick={() => navigate("/register")}
          />
        </MenuMenu>
      )}
    </Menu>
  );

  return MenuBar;
}

export default MenuBar;
