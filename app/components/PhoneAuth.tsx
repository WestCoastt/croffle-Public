"use client";
import styled from "@emotion/styled";
import Button from "../components/Button";
import { Warning } from "../login/page";

const ConfirmBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 16px;

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

export default function PhoneAuth() {
  return (
    <>
      <ConfirmBox>
        <ConfirmInput placeholder="휴대폰 번호" type="text" />
        <Button wd="138px" bg="var(--primary)" content="인증번호 받기" />
      </ConfirmBox>
      <ConfirmBox>
        <div className="box">
          <ConfirmInput placeholder="인증번호 6자리" type="text" />
          <span>02:59</span>
        </div>
        <Button wd="138px" bg="var(--light)" content="인증번호 확인" />
      </ConfirmBox>
      <Warning>인증번호를 입력해 주세요</Warning>
    </>
  );
}
