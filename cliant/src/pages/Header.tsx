import { Center, Heading } from "@yamada-ui/react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
export const HeaderLayor = () => {
  return (
    <>
      <HeaderDiv>
        <Center>
          <Heading size={"2xl"}>SpotiCT</Heading>
        </Center>
      </HeaderDiv>
      <Outlet />
    </>
  );
};

const HeaderDiv = styled.header`
  width: 100%;
  height: 5rem;
  background-color: #bdb76b;
  color: #fff;
  padding: 10px 0;
  margin-bottom: 20px;
`;
