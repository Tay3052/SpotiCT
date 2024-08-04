import styled from "styled-components";
import { Detail } from "../components/Detail";
export const DetailPage = () => {
  return (
    <>
      <MainDiv>
        <Detail />
      </MainDiv>
    </>
  );
};
const MainDiv = styled.main`
  width: 100%;
  height: 100%;
  padding: 20px;
`;
