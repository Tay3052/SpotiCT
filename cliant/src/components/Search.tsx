import React, { useState } from "react";
import styled from "styled-components";
import { Center, Input, Button } from "@yamada-ui/react";

export const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ id: string }[]>([]);

  const handleSearch = async () => {
    const token = localStorage.getItem("token");
    const expiryTime = localStorage.getItem("expiryTime");
    if (!token || !expiryTime || new Date().getTime() > parseInt(expiryTime)) {
      console.error("Token is invalid or expired");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5001/search?q=${encodeURIComponent(
          query
        )}&type=track`,
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
      console.log("Results:", results);
    } catch (error) {
      console.error("Error fetching data:", error.message);
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
        />
        <Button onClick={handleSearch}>Search</Button>
      </Center>
      <Results>
        {results.map((track) => (
          <div key={track.id}>
            <img
              src={track.album.images[0].url}
              alt={track.name}
              width={50}
              height={50}
            />
            <p>
              {track.name} by{" "}
              {track.artists.map((artist) => artist.name).join(", ")}
            </p>
          </div>
        ))}
      </Results>
    </MainDiv>
  );
};

const MainDiv = styled.main`
  width: 100%;
  height: 100%;
  padding: 20px;
`;

const Results = styled.div`
  margin-top: 20px;
`;
