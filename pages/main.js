import React, { useState, useEffect } from "react"
import { api } from "../services/api"
import { useRouter } from "next/router"
import ItemSingle from "../components/Item/Item"

import styled from "styled-components"
import { colors } from "../utils/colors"
import { Spinner } from "../components/Spinner/Spinner"
const Home = () => {
  const router = useRouter()
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getItems = async () => {
      try {
        setIsLoading(true)
        let res = await api.get("/dragon")
        let resArray = arraySort(res.data)
        setItems(resArray)
      } catch (error) {
        if (error.response) {
          console.error("error.response: ", error.response)
        }
      } finally {
        setIsLoading(false)
      }
    }
    getItems()
  }, [])

  const arraySort = arr =>
    arr.sort((a, b) => {
      if (a.name > b.name) return 1
      if (a.name < b.name) return -1
      return 0
    })

  const handleNavigation = () => {
    router.push("/add")
  }

  const handleDelete = id => {
    setItems([...items.filter(item => item.id !== id)])
  }

  return (
    <HomeContainer>
      <TitleWrapper>
        <Title>Dragons</Title>
        <Button id="addButton" onClick={handleNavigation}>
          Add Dragon
        </Button>
      </TitleWrapper>
      {isLoading ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <ItemArea>
          {items.map(item => {
            return (
              <ItemSingle
                key={item.id}
                data={item}
                onHandleDelete={handleDelete}
              />
            )
          })}
        </ItemArea>
      )}
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 32px;
`
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    margin-top: 0;
  }
`
const Title = styled.h1`
  font-family: "Open Sans";
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
`
const Button = styled.button`
  background-color: ${colors.mediumBlack};
  color: ${colors.white};
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  height: 40px;
  padding: 8px 16px;

  @media (max-width: 768px) {
    width: 100%;
  }
`
const ItemArea = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-top: 32px;
  justify-content: space-around;

  @media (max-width: 768px) {
    flex-flow: column nowrap;
  }
`

const SpinnerWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  height: 10;
`

export default Home
