import React from "react";
import styled from "styled-components";
import { colors } from "../../utils/colors";

const Input = (props) => (
  <InputField
    placeholder={props.placeholder}
    onChange={props.onChange}
    name={props.name}
    value={props.value}
    type={props.type}
    disabled={props.disabled}
    id={props.id}
  />
);

export const InputField = styled.input`
  border: 1px solid #424242;
  height: 40px;
  width: 280px;
  padding: 8px 0 8px 8px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: ${colors.mediumBlack};

  ::invalid {
    border: 1px solid red;
  }
`;

export default Input;
