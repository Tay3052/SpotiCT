import { SignIn } from "../components/SignIn";
import styled from "styled-components";

export const SigninPage = () => {
  return (
    <MainDiv>
      <SignIn />
    </MainDiv>
  );
};

const MainDiv = styled.main`
  width: 100%;
  height: 100%;
  padding: 20px;
`;
