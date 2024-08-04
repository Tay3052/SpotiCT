import { useState } from "react";
import styled from "styled-components";
import {
  Center,
  Input,
  Button,
  Pagination,
  Text,
  Heading,
  Box,
} from "@yamada-ui/react";
import { Track } from "../interfaces/interface";
import { Link } from "react-router-dom";
import { SearchApi } from "../api/fetch/getMusicInfo";

export const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Track[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const handleSearch = async (page = 1) => {
    const token = localStorage.getItem("token");
    const expiryTime = localStorage.getItem("expiryTime");
    if (!token || !expiryTime || new Date().getTime() > parseInt(expiryTime)) {
      console.error("Token is invalid or expired");
      return;
    }

    const newOffset = (page - 1) * 10;

    try {
      const data = await SearchApi(query, newOffset);
      console.log("Response status:", data.status);
      if (!data) {
        const errorData = data;
        if (errorData.error.status === 401) {
          console.error("Invalid token, redirecting to login");
        } else {
          throw new Error(
            `Network response was not ok: ${errorData.error.message}`
          );
        }
      }

      console.log("Search results:", data);
      setResults(data.tracks.items);
      setTotal(data.tracks.total);
      setOffset(newOffset);
    } catch (error) {
      console.error("Error fetching data:", (error as Error).message);
    }
  };

  return (
    <>
      <Center>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a track"
          width={"50%"}
          margin={"20px 0"}
        />
        <Button margin={"20px 0"} onClick={() => handleSearch(1)}>
          Search
        </Button>
      </Center>
      <Center>
        <Results>
          {results.map((track) => (
            <MusicDiv key={track.id}>
              <img
                src={track.album.images[0].url}
                alt={track.name}
                width={200}
                height={200}
              />
              <Box style={{ margin: "0 0 0 40px" }}>
                <Link to={`/detail/${track.id}`}>
                  <Heading>{track.name}</Heading>
                </Link>
                <Text>
                  アーティスト名：
                  {track.artists
                    .map((artist: { name: string }) => artist.name)
                    .join(", ")}
                </Text>
              </Box>
            </MusicDiv>
          ))}
        </Results>
      </Center>
      {/* ペジネート */}
      <Center>
        <Pagination
          page={offset / 10 + 1}
          total={Math.ceil(total / 10)}
          onChange={(page) => handleSearch(page)}
          style={{ margin: "40px 0" }}
        />
      </Center>
    </>
  );
};

const Results = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const MusicDiv = styled.div`
  width: 50rem;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #777;
  border-radius: 5px;
`;
