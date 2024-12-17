import React, { Component, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuMenu, MenuItem, Menu, Segment } from "semantic-ui-react";

function MenuBar() {
  const [activeItem, setActiveItem] = useState("home");
  

  const navigate = useNavigate(); 

  return (
    <Menu pointing secondary>
      <MenuItem
        name="home"
        active={activeItem === "home"}
        onClick={()=>navigate('/')}
      />
      <MenuMenu position="right">
        <MenuItem
          name="login"
          active={activeItem === "login"}
          onClick={()=>navigate('/login')}
        />
        <MenuItem
          name="register"
          active={activeItem === "register"}
          onClick={()=>navigate('/register')}
        />
      </MenuMenu>
    </Menu>
  );
}

export default MenuBar;

