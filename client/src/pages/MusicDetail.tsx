import { Detail } from "../components/Detail";
import styled from "styled-components";

export const MusicDetail = () => {
  return (
    <MainDiv>
      <Detail />
    </MainDiv>
  );
};

const MainDiv = styled.main`
  width: 100%;
  height: 100%;
  padding: 20px;
`;
