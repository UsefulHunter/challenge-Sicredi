import React from "react";
import styled from "styled-components";
import { colors } from "../../utils/colors";

const Label = (props) => <LabelInput>{props.value}</LabelInput>;

export const LabelInput = styled.span`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: ${colors.mediumBlack};
`;

export default Label;
