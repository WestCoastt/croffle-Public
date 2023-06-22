"use client";
import Link from "next/link";
import Button from "@/app/components/Button";
import { BtnBox, Container } from "../../../../components/Login";
import styled from "@emotion/styled";

const Title = styled.div`
  padding: 24px 72px;

  p {
    text-align: center;
    font-size: 20px;
    margin: 0;
  }
  .check {
    font-size: 16px;
    color: #999999;
    margin-top: 10px;
  }
`;

const Account = styled.div`
  width: 500px;
  border: 1px solid #eeeeee;
  border-radius: 5px;
  padding: 28px 0;

  .wrap {
    display: flex;
    align-items: center;
    margin: auto;
    width: fit-content;
  }
  .account {
    margin-left: 12px;
  }
  p {
    margin-top: 0;
    margin-bottom: 8px;
    width: fit-content;
    width: 280px;
    word-break: break-word;
  }
  span {
    color: #999999;
  }
`;

const Changed = styled.div`
  width: 500px;
  border: 1px solid #eeeeee;
  border-radius: 5px;
  padding: 60px 0;
  margin-bottom: 40px;
  font-size: 20px;

  text-align: center;

  p {
    margin-top: 0;
  }
  span {
    font-size: 15px;
    color: #555555;
  }
`;

export default function Result(props: { params: { slug: string } }) {
  //find페이지에서 api호출로 setAtom(true)로 상태 저장하고 success페이지에서 useAtom으로 상태불러왔을때 true가 아니면 url로 직접 접근한 것으로 보고 홈으로 redirect

  if (props.params.slug === "id") {
    return (
      <Container>
        <div className="title">아이디 찾기</div>
        <Title>
          <p>고객님의 크로플 계정을 찾았습니다.</p>
          <p className="check">아이디 확인 후 로그인해주세요.</p>
        </Title>
        <Account>
          <div className="wrap">
            <img src="/assets/img/user2.svg" alt="user" />
            <div className="account">
              <p className="name">user_email@email.com</p>
              <span>가입일 2023.04.29</span>
            </div>
          </div>
        </Account>
        <BtnBox>
          <Link href="/login">
            <Button bg="var(--primary)" content="로그인" />
          </Link>
          <Link href="/login/find/password">
            <Button clr="var(--primary)" bg="#fff" content="비밀번호 찾기" />
          </Link>
        </BtnBox>
      </Container>
    );
  }
  if (props.params.slug === "password") {
    return (
      <Container>
        <div className="title">비밀번호 변경완료</div>
        <Changed>
          <p>비밀번호가 변경되었습니다.</p>
          <span>새로운 비밀번호로 로그인해주세요.</span>
        </Changed>

        <Link href="/login">
          <Button bg="var(--primary)" content="로그인" />
        </Link>
      </Container>
    );
  }
}
