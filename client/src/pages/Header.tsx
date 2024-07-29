import { Center, Heading } from "@yamada-ui/react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
export const HeaderLayor = () => {
  return (
    <>
      <HeaderDiv>
        <Center>
          <Link to={"/"}>
            <Heading size={"4xl"}>SpotiCT</Heading>
          </Link>
        </Center>
        <Navibar>
          <NavUl>
            <li>
              <Link to={"/signup"}>Sign Up</Link>
            </li>
            <li>
              <Link to={"/signin"}>Sign In</Link>
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
  height: 9rem;
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
