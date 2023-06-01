"use client";
import styled from "@emotion/styled";
import Button from "../components/Button";
import CheckBox from "../components/CheckBox";
import { Container, Input, BoxContainer, Warning } from "../login/page";
import { primary, light } from "../styles/color";

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

export default function SignUp() {
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
        <Button wd="138px" bg={primary} content="인증번호 받기" />
      </ConfirmBox>
      <ConfirmBox>
        <div className="box">
          <ConfirmInput placeholder="인증번호 입력" type="text" />
          <span>03:00</span>
        </div>
        <Button wd="138px" bg={light} content="인증번호 확인" />
      </ConfirmBox>

      <BoxContainer>
        <CheckBox label="전체 동의합니다." />
      </BoxContainer>
      <CheckBox sm={true} label="이용약관 동의(필수)" />
      <CheckBox sm={true} label="개인정보 수집 이용 동의(필수)" />
      <CheckBox sm={true} label="개인정보 수집 이용 동의(선택)" />
      <Button bg={primary} content="가입하기" />
    </Container>
  );
}
