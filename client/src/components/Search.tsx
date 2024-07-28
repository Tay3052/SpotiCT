import { useState } from "react";
import styled from "styled-components";
import {
  Center,
  Input,
  Button,
  Pagination,
  Text,
  Heading,
} from "@yamada-ui/react";
import { Track } from "../interfaces/interface";
import { Link } from "react-router-dom";

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
      const response = await fetch(
        `http://localhost:5001/search?q=${encodeURIComponent(
          query
        )}&type=track&offset=${newOffset}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response status:", response);
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error.status === 401) {
          console.error("Invalid token, redirecting to login");
        } else {
          throw new Error(
            `Network response was not ok: ${errorData.error.message}`
          );
        }
      }
      const data = await response.json();
      console.log("Search results:", data);
      setResults(data.tracks.items);
      setTotal(data.tracks.total);
      setOffset(newOffset);
    } catch (error) {
      console.error("Error fetching data:", (error as Error).message);
    }
  };

  return (
    <MainDiv>
      <Center>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a track"
          width={"50%"}
          margin={"0 0 20px 0"}
        />
        <Button margin={"0 0 20px 0"} onClick={() => handleSearch(1)}>
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
              <Text margin={"0 0 0 40px"}>
                <Link to={`/detail/${track.id}`}>
                  <Heading>{track.name}</Heading>
                </Link>
                アーティスト名：
                {track.artists
                  .map((artist: { name: string }) => artist.name)
                  .join(", ")}
              </Text>
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
          style={{ marginTop: "40px" }}
        />
      </Center>
    </MainDiv>
  );
};

const MainDiv = styled.main`
  width: 100%;
  height: 100%;
  padding: 20px;
`;

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
