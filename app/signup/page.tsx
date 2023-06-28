"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAtom, useAtomValue } from "jotai";
import axios from "axios";
import styled from "@emotion/styled";
import CryptoJS from "crypto-js";
import CheckBox, { checkBoxAtom } from "../components/CheckBox";
import { Container } from "../components/Login";
import SignUpForm, { formAtom, inputDataAtom } from "../components/SignUpForm";
import { Btn } from "../components/Button";
import PhoneAuth from "../components/PhoneAuth";

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

const Button = styled(Btn)``;

interface InputData {
  account_email: string;
  account_password: string;
  account_name: string;
  account_phone: string;
}

export default function SignUp() {
  const router = useRouter();
  const terms = [
    "이용약관 동의(필수)",
    "개인정보 수집 이용 동의(필수)",
    "개인정보 수집 이용 동의(선택)",
  ];

  const formValid = useAtomValue(formAtom);
  const inputData = useAtomValue(inputDataAtom);
  const [checkBox, setCheckBox] = useAtom(checkBoxAtom);
  useEffect(() => {
    setCheckBox([false, false, false]);
  }, []);

  const handleSignUp = async () => {
    if (!formValid) return alert("입력하신 정보를 확인해주세요.");
    if (!checkBox[0] || !checkBox[1])
      return alert("필수 항목에 모두 동의해주세요.");

    let input = { ...inputData };
    input.account_password = CryptoJS.SHA256(
      inputData.account_password
    ).toString();

    try {
      const res = await axios.post("/v1/accounts", input);
      if (res.data.code === 0) {
        sessionStorage.setItem("user", inputData.account_name);
        router.replace("/signup/completed");
      }
    } catch (e: any) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container>
      <div className="title">회원가입</div>
      <SignUpForm />

      {/* //휴대폰 인증 추후 개발
      <PhoneAuth /> */}
      {/* <ConfirmBox>
        <ConfirmInput placeholder="휴대폰 번호" type="text" />
        <Button wd="138px" bg="var(--primary)" content="인증번호 받기" />
      </ConfirmBox>
      <ConfirmBox>
        <div className="box">
          <ConfirmInput placeholder="인증번호 입력" type="text" />
          <span>03:00</span>
        </div>
        <Button wd="138px" bg="var(--light)" content="인증번호 확인" />
      </ConfirmBox> */}

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
      <Btn bg="var(--primary)" onClick={handleSignUp}>
        가입하기
      </Btn>
    </Container>
  );
}
