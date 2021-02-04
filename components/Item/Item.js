import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { colors } from "../../utils/colors"
import PenSVG from "../SVG/PenSVG"
import TrashSVG from "../SVG/TrashSVG"
import Modal from "../Modal/Modal"
import Dialog from "../Dialog/Dialog"
import Feedback from "../Feedback/Feedback"
import { api } from "../../services/api"

import { useRouter } from "next/router"

const ItemSingle = props => {
  const router = useRouter()
  const modalRef = useRef()
  const dialogRef = useRef()
  const feedbackRef = useRef()

  const openModal = () => {
    modalRef.current.openModal()
  }
  const openDialog = () => {
    dialogRef.current.openDialog()
  }
  const closeDialog = () => {
    dialogRef.current.close()
  }
  const openFeedback = () => {
    dialogRef.current.close()
    feedbackRef.current.openFeedback()
  }

  const handleDelete = async () => {
    try {
      await api.delete(`dragon/${props.data.id}`)
      props.onHandleDelete(props.data.id)
      openFeedback()
    } catch (error) {
      if (error.response) {
        console.error(error.response)
      }
    }
  }
  const handleNavigate = () => {
    router.push({
      pathname: "/add",
      query: { id: props.data.id, isEdit: true },
    })
  }
  const handleDetails = () => {
    router.push({
      pathname: "details",
      query: { id: props.data.id },
    })
  }

  return (
    <Item>
      <ItemTitle id="itemTitle" onClick={handleDetails}>
        {props.data.name}
      </ItemTitle>
      <ItemIconContainer>
        <Icon onClick={openDialog}>
          <TrashSVG />
        </Icon>
        <Icon onClick={handleNavigate}>
          <PenSVG />
        </Icon>
      </ItemIconContainer>
      <Modal ref={modalRef}>
        <ModalWrapper>
          <ModalImage src={props.data.url} />
          <ModalInfo>
            <ModalTitle>{props.data.name}</ModalTitle>

            <ModalIconContainer>
              <Icon id="deleteIcon" onClick={openDialog}>
                <TrashSVG />
              </Icon>
              <Icon id="editIcon" onClick={() => handleNavigate(props.data.id)}>
                <PenSVG />
              </Icon>
            </ModalIconContainer>
          </ModalInfo>
        </ModalWrapper>
      </Modal>
      <Dialog ref={dialogRef}>
        <ModalTitle>Excluir Dragão?</ModalTitle>
        <ItemText>Tem certeza que deseja excluir este Dragão?</ItemText>
        <ButtonContainer>
          <DialogButtonSecondary onClick={closeDialog}>
            Cancelar
          </DialogButtonSecondary>
          <DialogButtonPrimary id="confirmButton" onClick={handleDelete}>
            Excluir
          </DialogButtonPrimary>
        </ButtonContainer>
      </Dialog>
      <Feedback ref={feedbackRef}>
        <ModalTitle>Dragão excluído</ModalTitle>
        <ItemText>Dragão excluído com sucesso!</ItemText>
      </Feedback>
    </Item>
  )
}

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 32px 0;
  border: 1px solid black;
  border-radius: 4px;
  ::last-child {
    flex-grow: 10;
  }

  @media (max-width: 768px) {
    width: 100%;
    align-items: center;
  }
`
export const ItemImg = styled.img`
  object-fit: none;
  object-position: center;
  height: 350px;
  width: 350px;
`

export const ItemTitle = styled.h3`
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 18px;
  cursor: pointer;
  color: ${colors.mediumBlack};
`

export const ItemSubtitle = styled.span`
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: ${colors.mediumBlack};
  margin-top: 24px;
  margin-bottom: 10px;
`

export const ItemText = styled.span`
  font-family: "Open Sans";
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
`

export const ItemIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
`

export const ModalIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-left: 5px;
  margin-top: auto;
`

export const Icon = styled.div`
  margin-right: 16px;
  cursor: pointer;
`

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`

export const ModalImage = styled.img`
  width: 50%;
`
export const ModalInfo = styled.div`
  display: flex;
  flex-flow: column wrap;
  padding: 32px 0 28px 30px;
`
export const ModalTitle = styled.h1`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
  margin-top: 0;
  margin-bottom: 10px;
`

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: auto;
`

export const DialogButtonPrimary = styled.button`
  background-color: ${colors.mediumBlack};
  color: ${colors.white};
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  height: 40px;
  padding: 8px 16px;
  width: 30%;
`

export const DialogButtonSecondary = styled.button`
  background-color: ${colors.white};
  color: #212121;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  height: 40px;
  padding: 8px 16px;
  box-shadow: none;
  border: 1px solid #212121;
  margin-right: 24px;
  padding: 8px 16px;
  width: 30%;
`

export default ItemSingle
