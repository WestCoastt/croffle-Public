"use client";
import styled from "@emotion/styled";
import Button from "../components/Button";
import CheckBox from "../components/CheckBox";
import { primary } from "../styles/color";

export const Container = styled.div`
  margin: auto;
  margin-top: 40px;
  margin-bottom: 80px;
  width: 500px;

  .title {
    font-size: 32px;
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
    border: 1px solid ${primary};
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
  }
  .divider {
    display: inline-block;
    width: 1px;
    height: 12px;
    margin: 0 8px;
    background-color: #dddddd;
  }
`;
const BtnBox = styled.div`
  height: 106px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 36px;
`;

export default function Login() {
  return (
    <Container>
      <div className="title">로그인</div>
      <Input placeholder="아이디(이메일)" type="text" />
      {/* <Warning>아이디(이메일)는 이메일 형식으로 입력해주세요.</Warning> */}
      <Input placeholder="비밀번호" type="password" />
      {/* <Warning>{message}</Warning> */}
      <BoxContainer>
        <CheckBox label="로그인 상태 유지" />
        <div>
          <span className="find">아이디 찾기</span>
          <span className="divider" />
          <span className="find">비밀번호 찾기</span>
        </div>
      </BoxContainer>
      <BtnBox>
        <Button bg={primary} content="로그인" />
        <Button clr={primary} content="회원가입" bg="#fff" />
      </BtnBox>
    </Container>
  );
}
