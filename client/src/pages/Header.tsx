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
            <Heading size={"2xl"}>SpotiCT</Heading>
          </Link>
        </Center>
        <Navibar>
          <ul>
            <li>
              <Link></Link>
            </li>
          </ul>
        </Navibar>
      </HeaderDiv>

      <Outlet />
    </>
  );
};

const HeaderDiv = styled.header`
  width: 100%;
  height: 6rem;
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
  list-style: none;
`;
