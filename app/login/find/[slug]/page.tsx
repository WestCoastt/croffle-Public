"use client";
import PhoneAuth from "@/app/components/PhoneAuth";
import { Container, Input } from "../../page";
import Button from "@/app/components/Button";

export default function Find(props: { params: { slug: string } }) {
  if (props.params.slug === "id") {
    return (
      <Container>
        <div className="title">아이디 찾기</div>
        <Input placeholder="이름" type="text" />
        <PhoneAuth />
        <Button bg="var(--primary)" content="확인" mt="36px" />
      </Container>
    );
  }
  if (props.params.slug === "password") {
    return (
      <Container>
        <div className="title">비밀번호 찾기</div>
        <Input placeholder="아이디(이메일)" type="text" />
        <PhoneAuth />
        <Button bg="var(--primary)" content="확인" mt="36px" />
      </Container>
    );
  }
}
