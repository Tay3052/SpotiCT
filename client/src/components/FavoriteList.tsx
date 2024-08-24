import { useState, useEffect } from "react";
import { getData } from "../database/dbFunc";
import Cookies from "js-cookie";
import styled from "styled-components";
import { Text, Center } from "@yamada-ui/react";

export const FavoriteList = () => {
  const [favoriteList, setFavoriteList] = useState<
    {
      id: string;
      user_id: string;
    }[]
  >([]);
  const [uid, setUid] = useState<string>();

  useEffect(() => {
    setUid(Cookies.get("uid"));
    const fetchFavoriteList = async () => {
      const favorite = await getData("favorite", "user_id", "==", uid ?? "");

      console.log(favorite);
      setFavoriteList(favorite);
    };
    fetchFavoriteList();
  }, [uid]);

  return (
    <>
      <Center>
        <Text fontSize={"2xl"} style={{ margin: "0 0 20px 0" }}>
          お気に入りリスト
        </Text>
      </Center>
      <FavoriteUl>
        {favoriteList?.map((id) => (
          <li key={id}>
            <Text fontSize={"2xl"} margin={"0 40px 0 0"}>
              {id}
            </Text>
          </li>
        ))}
      </FavoriteUl>
    </>
  );
};

const FavoriteUl = styled.ul``;
