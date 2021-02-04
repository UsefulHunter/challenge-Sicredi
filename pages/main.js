import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import { useRouter } from "next/router";
import ItemSingle from "../components/Item/Item";

import styled from "styled-components";
import { colors } from "../utils/colors";

const Home = () => {
  const router = useRouter();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      try {
        let res = await api.get("/dragon");
        console.log(api);
        let resArray = arraySort(res.data);
        setItems(resArray);
        //console.log("ITEMS: ", items);
      } catch (error) {
        if (error.response) {
          console.error("error.response: ", error.response);
        }
      }
    };
    getItems();
  }, []);
  const arraySort = (arr) =>
    arr.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });

  const handleNavigation = () => {
    router.push("/add");
  };

  return (
    <HomeContainer>
      <TitleWrapper>
        <Title>Dragons</Title>
        <Button id="addButton" onClick={handleNavigation}>
          Add Dragon
        </Button>
      </TitleWrapper>
      <ItemArea>
        {items.map((item) => {
          return <ItemSingle key={item.id} data={item} />;
        })}
      </ItemArea>
    </HomeContainer>
  );
};

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 32px;
`;
export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    margin-top: 0;
  }
`;
export const Title = styled.h1`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  line-height: 48px;
  display: flex;
  align-items: center;
  color: ${colors.mediumBlack};

  @media (max-width: 768px) {
    font-size: 58px;
  }
`;
export const Button = styled.button`
  background-color: ${colors.mediumBlack};
  color: ${colors.white};
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  height: 40px;
  padding: 8px 16px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
export const ItemArea = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-top: 32px;
  justify-content: space-around;

  @media (max-width: 768px) {
    flex-flow: column nowrap;
  }
`;

export default Home;
