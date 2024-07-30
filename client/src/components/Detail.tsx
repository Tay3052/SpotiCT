import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getMusicInfo } from "../api/fetch/getMusicInfo";
import { Heading } from "@yamada-ui/react";
import { TrackData } from "../interfaces/database/dbInterface";

export const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = React.useState<TrackData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMusicInfo(id ? id : "");
      setData(data);
    };
    fetchData();
  }, [id]);

  return (
    <>
      <DetailContainer>
        <ul>
        <Heading>{data.map(track)=>({
          
        })}</Heading>
        </ul>
      </DetailContainer>
    </>
  );
};

const DetailContainer = styled.div``;
