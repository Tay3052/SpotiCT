import React, { useEffect, useState } from "react";
import { Center, Text } from "@yamada-ui/react";
import styled from "styled-components";
import { GetMusicInfo } from "../api/fetch/getMusicInfo";
import { Box } from "@yamada-ui/react";
import { TrackData } from "../interfaces/database/dbInterface";

export const Param: React.FC<{ id: string }> = ({ id }) => {
  const [data, setData] = useState<TrackData>();
  useEffect(() => {
    const fetchData = async () => {
      const data = await GetMusicInfo(id);
      setData(data);
    };
    fetchData();
  }, [id]);
  return (
    <>
      <Box>
        <Center>
          <Text fontSize={"2xl"} style={{ margin: "0 0 20px 0" }}>
            パラメータ一覧
          </Text>
        </Center>
        <Center>
          <DetailUl>
            <li>
              <Text fontSize={"2xl"} margin={"0 40px 0 0"}>
                Key：{data?.key}
              </Text>
            </li>
            <li>
              <Text fontSize={"2xl"} margin={"0 40px 0 0"}>
                Tempo：{data?.tempo}BPM
              </Text>
            </li>
            <li>
              <Text fontSize={"2xl"} margin={"0 40px 0 0"}>
                Energy：{data?.energy}
              </Text>
            </li>
            <li>
              <Text fontSize={"2xl"} margin={"0 40px 0 0"}>
                Danceability：{data?.danceability}
              </Text>
            </li>
          </DetailUl>
        </Center>
        ;
      </Box>
    </>
  );
};

const DetailUl = styled.ul`
  display: flex;
  justify-content: center;
  color: red;
`;
