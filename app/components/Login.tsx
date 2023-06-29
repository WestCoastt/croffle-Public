"use client";
import styled from "@emotion/styled";
import Link from "next/link";
import CryptoJS from "crypto-js";
import Button, { Btn } from "../components/Button";
import CheckBox, { rememberMeAtom } from "../components/CheckBox";
import { KeyboardEvent, ChangeEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";

export const Container = styled.div`
  margin: auto;
  margin-top: 40px;
  margin-bottom: 80px;
  width: 500px;

  .title {
    font-size: 32px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 24px;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 48px;
  margin-top: 16px;
  padding: 14px 18px;
  border: 1px solid #c9c9c9;
  border-radius: 5px;
  outline: none;
  &:focus {
    border: 1px solid var(--primary);
  }
`;

export const Warning = styled.div`
  margin-top: 8px;
  font-size: 13px;
  color: #e50000;
`;

export const BoxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;

  .find {
    font-size: 14px;
    cursor: pointer;
    text-decoration: none;
    color: initial;
  }
  .divider {
    display: inline-block;
    width: 1px;
    height: 12px;
    margin: 0 8px;
    background-color: #dddddd;
  }
`;
export const BtnBox = styled.div`
  height: 106px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 36px;
`;

const LoginBtn = styled(Btn)``;

export default function Login() {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    account_email: "",
    account_password: "",
  });
  const [validId, setValidId] = useState(false);
  const rememberMe = useAtomValue(rememberMeAtom);

  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    if (e.target.name === "account_email")
      setValidId(regex.test(e.target.value));
  };

  const handleLogin = async () => {
    if (loginData.account_email === "" || loginData.account_password === "") {
      return alert("아이디와 비밀번호를 확인해주세요.");
    }

    let input = { ...loginData };
    input.account_password = CryptoJS.SHA256(
      loginData.account_password
    ).toString();

    try {
      const res = await axios.post("/v1/auths/login", input);
      if (res.data.code === 0) {
        rememberMe
          ? localStorage.setItem("tk", res.data.data.access_token)
          : sessionStorage.setItem("tk", res.data.data.access_token);
        router.push("/");
      }
    } catch (e: any) {
      if (e.response.data.code === 11001)
        alert("이메일 또는 비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  //todo : 로그인 유지 기능(true: localStorage 저장, false: sessionStorage  저장)

  return (
    <Container>
      <div className="title">로그인</div>
      <Input
        name="account_email"
        placeholder="아이디(이메일)"
        type="text"
        onChange={handleInput}
      />
      {loginData.account_email !== "" && !validId && (
        <Warning>아이디(이메일)는 이메일 형식으로 입력해주세요.</Warning>
      )}
      <Input
        name="account_password"
        placeholder="비밀번호"
        type="password"
        onChange={handleInput}
        onKeyDown={onKeyDown}
      />
      {/* <Warning>이메일 또는 비밀번호가 올바르지 않습니다. 다시 확인해주세요.</Warning> */}
      <BoxContainer>
        <CheckBox label="로그인 상태 유지" />
        <div>
          <Link href="/login/find/id" className="find">
            아이디 찾기
          </Link>
          <span className="divider" />
          <Link href="/login/find/password" className="find">
            비밀번호 찾기
          </Link>
        </div>
      </BoxContainer>
      <BtnBox>
        <LoginBtn bg="var(--primary)" onClick={handleLogin}>
          로그인
        </LoginBtn>
        <Link href="/signup">
          <Button clr="var(--primary)" content="회원가입" bg="#fff" />
        </Link>
      </BtnBox>
    </Container>
  );
}
