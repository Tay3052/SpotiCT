import { Center, Image } from "@yamada-ui/react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { LogOut } from "../components/LogOut";
import Logo from "../assets/img/logo.png";
export const HeaderLayor = () => {
  return (
    <>
      <HeaderDiv>
        <Center>
          <Link to={"/"}>
            <Image src={Logo} style={{ height: "5rem" }}></Image>
          </Link>
        </Center>
        <Navibar>
          <NavUl>
            <li>
              <Link to={"/signup"}>SignUp</Link>
            </li>
            <li>
              <Link to={"/signin"}>SignIn</Link>
            </li>
            <li>
              <LogOut />
            </li>
          </NavUl>
        </Navibar>
      </HeaderDiv>

      <Outlet />
    </>
  );
};

const HeaderDiv = styled.header`
  width: 100%;
  height: 8rem;
  background-color: #bdb76b;
  color: #fff;
  padding: 10px 0;
  margin-bottom: 20px;
`;

const Navibar = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
  & ul {
    display: flex;
    list-style: none;
  }
`;
const NavUl = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 1.2rem;
  & li {
    margin-left: 20px;
  }
`;
