"use client";
import Link from "next/link";
import Button from "@/app/components/Button";
import { Container } from "../../components/Login";
import styled from "@emotion/styled";

const MemberCard = styled.div`
  display: flex;
  justify-content: space-between;
  width: 500px;
  border: 1px solid #eeeeee;
  border-radius: 5px;
  padding: 98px 84px;

  .name {
    margin: 0;
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 20px;
  }
  span {
    font-size: 15px;
    color: #555555;
  }
`;
const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 500px;
  margin: auto;
  margin-top: 50px;
`;

export default function Completed() {
  return (
    <Container>
      <div style={{ marginBottom: "40px" }} className="title">
        회원가입 완료
      </div>
      <MemberCard>
        <img src="/assets/img/user.svg" alt="user" />
        <div>
          <p className="name">이우찬님!</p>
          <span>
            크로플의 회원이 되셨습니다. <br /> 지금 바로 다양한 상품을
            둘러보세요.
          </span>
        </div>
      </MemberCard>

      <BtnBox>
        <Link href="/">
          <Button
            clr="var(--primary)"
            wd="196px"
            bg="#fff"
            content="메인으로"
          />
        </Link>
        <Link href="/login">
          <Button bg="var(--primary)" wd="290px" content="로그인" />
        </Link>
      </BtnBox>
    </Container>
  );
}
