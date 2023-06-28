"use client";
import { useSetAtom } from "jotai";
import axios from "axios";
import styled from "@emotion/styled";
import Button from "../components/Button";
import CheckBox, { checkBoxAtom } from "../components/CheckBox";
import { Container, Input, BoxContainer, Warning } from "../components/Login";
import { useEffect } from "react";
import PhoneAuth from "../components/PhoneAuth";
import Link from "next/link";

const ConfirmBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;

  .box {
    position: relative;
    flex: 1;
    margin-right: 6px;
    span {
      position: absolute;
      top: 14px;
      right: 12px;
      font-size: 14px;
      color: #f04030;
    }
  }
`;

const ConfirmInput = styled.input`
  flex: 1;
  margin: 0 6px 0 0;
  width: 100%;
  height: 48px;
  padding: 14px 18px;
  border: 1px solid #c9c9c9;
  border-radius: 5px;
  outline: none;
  &:focus {
    border: 1px solid var(--primary);
  }
`;

const CheckBoxContainer = styled.div<{ mg?: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${(props) => (props.mg ? props.mg : "0")};

  .terms {
    font-size: 13px;
    color: #0074fc;
    text-decoration-line: underline;
    cursor: pointer;
  }
`;

const TermsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 140px;
  margin-bottom: 40px;
  padding: 20px;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

export default function SignUp() {
  const terms = [
    "이용약관 동의(필수)",
    "개인정보 수집 이용 동의(필수)",
    "개인정보 수집 이용 동의(선택)",
  ];

  const setReset = useSetAtom(checkBoxAtom);
  useEffect(() => {
    setReset([false, false, false]);
    // handleSignUp();
  }, []);

  // const handleSignUp = async () => {
  //   try {
  //     const res = await axios.post("/v1/auths/login", {
  //       account_email: "abc@naver.com",
  //       account_password: "abc123",
  //       account_name: "이우찬",
  //       account_phone: "1234",
  //     });
  //     console.log(res.data);
  //   } catch (e: any) {
  //     alert(e.response.data.message);
  //   }
  // };

  return (
    <Container>
      <div className="title">회원가입</div>
      <Input placeholder="아이디(이메일)" type="text" />
      {/* <Warning>아이디(이메일)는 이메일 형식으로 입력해주세요.</Warning> */}
      <Input placeholder="비밀번호" type="password" />
      {/* <Warning>{message}</Warning> */}
      <Input placeholder="비밀번호 확인" type="password" />
      {/* <Warning>{message}</Warning> */}
      <Input placeholder="이름" type="text" />
      {/* <Warning>{message}</Warning> */}
      <Input placeholder="휴대폰번호" type="text" />

      {/* //휴대폰 인증 추후 개발
      <PhoneAuth /> */}

      <CheckBoxContainer mg="30px 0 10px 0">
        <CheckBox label="전체 동의합니다." />
      </CheckBoxContainer>
      <TermsBox>
        {terms.map((term, i) => (
          <CheckBoxContainer key={term}>
            <CheckBox sm={true} idx={i} label={term} />
            <div className="terms">약관보기 {">"}</div>
          </CheckBoxContainer>
        ))}
      </TermsBox>
      <Link href="/signup/completed">
        <Button bg="var(--primary)" content="가입하기" />
      </Link>
    </Container>
  );
}
