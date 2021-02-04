import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import { api } from "../services/api"
import { colors } from "../utils/colors"
import { dateFormatter } from "../utils/dateFormatter"
import styled from "styled-components"
import ArrowBackSVG from "../components/SVG/ArrowBackSVG"

export default function Details() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [date, setDate] = useState("")
  const { id } = router.query

  useEffect(() => {
    const getDragon = async () => {
      try {
        let res = await api.get(`dragon/${id}`)
        setName(res.data.name)
        setType(res.data.type)
        setDate(dateFormatter(res.data.createdAt))
      } catch (error) {
        if (error.response) {
          console.log("Error:", error.response)
        }
      }
    }
    getDragon()
  }, [id])

  const handleNavigate = () => {
    router.push({
      pathname: "/add",
      query: { id, isEdit: true },
    })
  }
  return (
    <Container>
      <Head>
        <title>Detalhes</title>
      </Head>
      <ContentWrapper>
        <TitleContainer>
          <Icon
            onClick={() => {
              router.push("/main")
            }}
          >
            <ArrowBackSVG />
          </Icon>
          <Title>{name}</Title>
          <Button id="editButtonDetail" onClick={handleNavigate}>
            Edit Dragon
          </Button>
        </TitleContainer>

        <Text>Tipo: {type}</Text>
        <Text>Criado em : {date}</Text>
      </ContentWrapper>
    </Container>
  )
}

const Title = styled.h1`
  font-family: "Open Sans";
  font-style: normal;
  font-weight: bold;
  line-height: 18px;
  color: ${colors.mediumBlack};
`

const Text = styled.h5`
  font-family: "Open Sans";
  font-style: normal;
  line-height: 18px;
  color: ${colors.mediumBlack};
`

const Container = styled.div`
  padding: 24px 32px 32px 32px;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-left: 32px;
  width: 75%;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-left: 0;
    width: 100%;
  }
`
const Icon = styled.div`
  margin-right: 16px;
  cursor: pointer;
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
