import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styled from "styled-components";
import { colors } from "../utils/colors";
import { LoginData } from "../utils/mockedLogin";
const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (event) => {
    const email = event.target.value;
    setEmail(email);
  };

  const handlePassword = (event) => {
    const password = event.target.value;
    setPassword(password);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event, email, password);
    if (email === LoginData.email && password === LoginData.password) {
      router.push({
        pathname: "/main",
      });
    } else {
      alert("INVALID DATA");
    }
  };

  return (
    <Wrapper>
      <Head>
        <meta chatSet="utf-8" />
        <title>Login</title>
      </Head>
      <LoginContainer>
        <Form onSubmit={handleSubmit}>
          <Label>E-mail</Label>
          <FormInput
            id="username"
            value={email}
            onChange={handleEmail}
            type="text"
            placeholder="E-mail"
          />
          <Label>Senha</Label>
          <FormInput
            id="password"
            value={password}
            onChange={handlePassword}
            type="password"
            placeholder="Senha"
          />
          <FormButton id="loginButton" type="submit">
            Entrar
          </FormButton>
        </Form>
      </LoginContainer>
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const LoginContainer = styled.div`
  border: 1px solid #212121;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  width: 100%;
  padding-top: 24px;
`;

export const Label = styled.label`
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: ${colors.mediumBlack};
  margin-left: 32px;
  margin-bottom: 4px;
`;
export const FormInput = styled.input`
  font-family: "Open Sans";
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: ${colors.lightGray};
  height: 40px;
  margin-left: 32px;
  padding-left: 8px;
  margin-right: 32px;
  margin-bottom: 32px;
`;

export const FormButton = styled.button`
  background-color: ${colors.mediumBlack};
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${colors.white};
  height: 40px;
  margin-left: 32px;
  margin-right: 32px;
  margin-bottom: 40px;
`;

export default Login;
