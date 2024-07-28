import { SignUp } from "../components/SIgnUp";
import styled from "styled-components";

export const SignupPage = () => {
  return (
    <MainDiv>
      <SignUp />
    </MainDiv>
  );
};

const MainDiv = styled.main`
  width: 100%;
  height: 100%;
  padding: 20px;
`;
