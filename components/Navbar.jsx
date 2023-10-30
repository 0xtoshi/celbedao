import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { Logo } from "./Logo.jsx";
import { Chip } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";

export default function NavbarMain() {
  const menuItems = ["Home"];

  return (
    <Navbar>
      <NavbarBrand>
        <img className="w-10" src="/logo.png"></img>
        <p className="font-bold text-inherit">BEDAO</p>
      </NavbarBrand>
      <NavbarContent
        className="hidden sm:flex gap-4"
        justify="center"
      ></NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="">
          <Avatar isBordered color="secondary" size="sm" src="/celestia.png" />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
