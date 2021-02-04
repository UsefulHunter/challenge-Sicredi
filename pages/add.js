import React, { useState, useEffect } from "react"
import Head from "next/head"
import { api } from "../services/api"
import { useRouter } from "next/router"
import styled from "styled-components"
import { colors } from "../utils/colors"
import Label from "../components/Label/Label"
import Input from "../components/Input/Input"
import ArrowBackSVG from "../components/SVG/ArrowBackSVG"

export default function Add() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [histories, setHistories] = useState([])
  const { id, isEdit } = router.query

  useEffect(() => {
    const verifyEdit = async () => {
      if (isEdit) {
        try {
          let res = await api.get(`/dragon/${id}`)
          setName(response.data.name)
          setType(res.data.type)
          setHistories(res.data.histories)
        } catch (error) {
          if (error.response) {
            console.log("Error: ", error.response)
          }
        }
      }
    }
    verifyEdit()
  }, [id])

  const onSubmit = async event => {
    event.preventDefault()
    if (isEdit) {
      try {
        await api.put(`/dragon/${id}`, {
          name,
          type,
          histories,
        })
        router.push("/main")
      } catch (error) {
        if (error.response) {
          console.error("error.response: ", error.response)
        }
      }
    } else {
      try {
        await api.post("/dragon", {
          name,
          type,
          histories,
        })
        router.push("/main")
      } catch (error) {
        if (error.response) {
          console.error("error.response: ", error.response)
        }
      }
    }
  }

  return (
    <Container>
      <Head>
        <title>{isEdit ? "Editar" : "Adicionar"}</title>
      </Head>
      <ContentWrapper>
        <FormContainer onSubmit={onSubmit}>
          <TitleContainer>
            <Icon
              onClick={() => {
                router.push("/main")
              }}
            >
              <ArrowBackSVG />
            </Icon>
            <Title>{isEdit ? "Editar Dragão" : "Adicionar Dragão"}</Title>
          </TitleContainer>

          <InputRow>
            <InputItem>
              <Label value="Nome" />
              <Input
                id="name"
                name="Name"
                type="text"
                onChange={event => setName(event.target.value)}
                value={name}
                placeholder="Nome"
              />
            </InputItem>
            <InputItem>
              <Label value="Tipo" />
              <Input
                id="type"
                name="Type"
                type="text"
                onChange={event => setType(event.target.value)}
                value={type}
                placeholder="Tipo"
              />
            </InputItem>
            <InputItem>
              <Label value="Nome" />
              <Input
                id="histories"
                name="Histories"
                type="text"
                onChange={event => setHistories(event.target.value)}
                value={histories}
                placeholder="História"
              />
            </InputItem>
          </InputRow>
          <FormButton id="submitButton" type="submit">
            Salvar
          </FormButton>
        </FormContainer>
      </ContentWrapper>
    </Container>
  )
}

const Container = styled.div`
  padding: 24px 32px 32px 32px;
`
const Text = styled.span`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
`
const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-left: 32px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-left: 0;
    width: 100%;
  }
`
const Title = styled.h1`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
  color: ${colors.mediumBlack};
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
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`
const InputRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 0;
    width: 100%;
  }
`
const InputItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 32px;

  @media (max-width: 768px) {
    margin-bottom: 16px;
    margin-left: 0;
  }
`
const FormButton = styled.button`
  background-color: ${colors.mediumBlack};
  color: ${colors.white};
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  height: 40px;
  padding: 8px 16px;
  width: 30%;
  margin-left: auto;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 100%;
  }
`
const Icon = styled.div`
  margin-right: 16px;
  cursor: pointer;
`
