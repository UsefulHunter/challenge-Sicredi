import React, { useState, useImperativeHandle, forwardRef } from "react"
import { useRouter } from "next/router"
import CloseSVG from "../SVG/CloseSVG"
import { Wrapper, Backdrop, CloseIcon } from "../Modal/Modal"

import styled from "styled-components"
import { colors } from "../../utils/colors"

const Feedback = forwardRef((props, ref) => {
  const router = useRouter()
  const [display, setDisplay] = useState(false)

  useImperativeHandle(ref, () => {
    return {
      openFeedback: () => open(),
      close: () => close(),
    }
  })

  const open = () => {
    setDisplay(true)
  }

  const close = () => {
    console.log(window.location)
    setDisplay(false)
    if (window.location.pathname === "/main") {
      document.location.reload()
    } else {
      router.push("/main")
    }
  }

  if (display) {
    return (
      <Wrapper>
        <Backdrop onClick={close} />
        <FeedbackBox>
          <CloseIcon id="closeIcon" onClick={close}>
            <CloseSVG />
          </CloseIcon>
          {props.children}
        </FeedbackBox>
      </Wrapper>
    )
  }
  return null
})

export const FeedbackBox = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 20%;
  width: 47%;
  max-width: 100%;
  background-color: ${colors.white};
  z-index: 103;
  padding: 32px 0px 32px 32px;

  display: flex;
  flex-direction: column;
`

export default Feedback
