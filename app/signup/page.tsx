"use client";
import { atom, useSetAtom } from "jotai";
import styled from "@emotion/styled";
import Button from "../components/Button";
import CheckBox from "../components/CheckBox";
import { Container, Input, BoxContainer, Warning } from "../login/page";
import { useEffect } from "react";

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

const ConfirmInput = styled(Input)`
  flex: 1;
  margin: 0 6px 0 0;
`;

const CheckBoxContainer = styled(BoxContainer)<{ mg?: string }>`
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

export const checkBoxAtom = atom([false, false, false]);
export default function SignUp() {
  const terms = [
    "이용약관 동의(필수)",
    "개인정보 수집 이용 동의(필수)",
    "개인정보 수집 이용 동의(선택)",
  ];

  const setReset = useSetAtom(checkBoxAtom);
  useEffect(() => {
    setReset([false, false, false]);
  }, []);

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

      <ConfirmBox>
        <ConfirmInput placeholder="휴대폰 번호" type="text" />
        <Button wd="138px" bg="var(--primary)" content="인증번호 받기" />
      </ConfirmBox>
      <ConfirmBox>
        <div className="box">
          <ConfirmInput placeholder="인증번호 입력" type="text" />
          <span>03:00</span>
        </div>
        <Button wd="138px" bg="var(--light)" content="인증번호 확인" />
      </ConfirmBox>

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
      <Button bg="var(--primary)" content="가입하기" />
    </Container>
  );
}
