import React, { useState, useImperativeHandle, forwardRef } from "react"
import styled from "styled-components"
import { colors } from "../../utils/colors"

import { Wrapper, Backdrop } from "../Modal/Modal"

const Dialog = forwardRef((props, ref) => {
  const [display, setDisplay] = useState(false)

  useImperativeHandle(ref, () => {
    return {
      openDialog: () => open(),
      close: () => close(),
    }
  })

  const open = () => {
    setDisplay(true)
  }

  const close = () => {
    setDisplay(false)
  }

  if (display) {
    return (
      <Wrapper>
        <Backdrop onClick={close} />
        <DialogBox>{props.children}</DialogBox>
      </Wrapper>
    )
  }
  return null
})

export const DialogBox = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 23%;
  width: 47%;
  max-width: 600px;
  background-color: ${colors.white};
  z-index: 101;
  display: flex;
  flex-direction: column;
  padding: 32px;
`

export default Dialog
