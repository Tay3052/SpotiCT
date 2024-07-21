import styled from "styled-components";
import { Heading, Center, Button } from "@yamada-ui/react";

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_CLIENT_REDIRECT_URI;
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

export const Home = () => {
  const handleLogin = () => {
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;
  };
  return (
    <MainDiv>
      <Center>
        <Heading>Welcome To NextFy</Heading>
      </Center>
      <Center>
        <Button margin={"2rem 0 0 0"} onClick={handleLogin}>
          Get Started
        </Button>
      </Center>
    </MainDiv>
  );
};

const MainDiv = styled.main`
  width: 100%;
  height: 100%;
  padding: 20px;
`;
