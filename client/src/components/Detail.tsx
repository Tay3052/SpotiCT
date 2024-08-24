import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { GetTrack } from "../fetch/getMusicInfo";
import { Text, Heading, Center, Box } from "@yamada-ui/react";
import { TrackInfos } from "../interfaces/database/dbInterface";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { addData, deleteData, getData } from "../database/dbFunc";
import { getCookieSession } from "../auth/Session";
import { Param } from "./Param";

export const Detail: React.FC = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const [infos, setInfos] = useState<TrackInfos>();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [changeID, setChangeID] = useState<string[]>([]);

  const uidToken = getCookieSession("uid");

  useEffect(() => {
    const handleFavorite = async () => {
      const favorite = await getData("favorite", "id", "==", id ?? "");
      const favoriteID = favorite.map((doc) => doc.user_id);
      if (favoriteID.includes(uidToken)) {
        setIsFavorite(true);
      }
      console.log(favoriteID);
    };

    const fetchTrack = async () => {
      const infos = await GetTrack(id);
      setInfos(infos);
    };
    fetchTrack();
    handleFavorite();
  }, [id, uidToken]);

  const handleFavorite = async () => {
    if (!isFavorite) {
      setIsFavorite(true);
      if (!uidToken) return;
      const addFavorite = await addData("favorite", {
        id: id,
        user_id: uidToken,
        name: infos?.name,
        description: infos?.album.name,
        createdAt: new Date(),
      });
      setChangeID((infos?.name, [...changeID, addFavorite.id]));
    } else {
      setIsFavorite(false);
      for (let i = 0; i < changeID.length; i++) {
        if (changeID) await deleteData("favorite", changeID[i]);
      }
    }
  };

  return (
    <>
      <Box>
        <Center>
          <Heading style={{ margin: "0 0 40px 0" }}>Music Datas</Heading>
        </Center>
        <DetailContainer>
          <Box>
            <Center>
              <Heading style={{ marginBottom: "40px" }}>{infos?.name}</Heading>
            </Center>
          </Box>
          <Center>
            <DetailBox>
              <DetailImg
                src={infos?.album?.images[0].url}
                alt="画像"
                style={{ marginRight: "40px" }}
              />
              <Box>
                <Text fontSize={"2xl"} margin={"0 0 20px 0"}>
                  Artist Name：{infos?.artists[0].name}
                  {infos?.artists[1] ? ` feat. ${infos?.artists[1].name}` : ""}
                </Text>
                <Text fontSize={"2xl"} margin={"0 0 20px 0"}>
                  Album Name：{infos?.album.name}
                </Text>
                <Text fontSize={"2xl"} margin={"0 0 20px 0"}>
                  Release Date：{infos?.album.release_date}
                </Text>
                <audio
                  controls
                  style={{ margin: "0 0 20px 0" }}
                  src={infos?.preview_url}></audio>
                <SpotifyBox>
                  <a
                    href={infos?.external_urls.spotify}
                    target="_blank"
                    style={{ margin: "0 20px 0 0" }}>
                    <Text fontSize={"2xl"}>Spotifyで聴く</Text>
                  </a>
                  <button onClick={handleFavorite}>
                    {isFavorite ? (
                      <FavoriteIcon
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    ) : (
                      <FavoriteBorderIcon
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    )}
                  </button>
                </SpotifyBox>
              </Box>
            </DetailBox>
          </Center>
          <Param id={id ?? ""} />
        </DetailContainer>
      </Box>
    </>
  );
};

const DetailContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const DetailImg = styled.img`
  width: 300px;
  height: 300px;
`;

const DetailBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 0 40px 0;
`;

const SpotifyBox = styled(Box)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
