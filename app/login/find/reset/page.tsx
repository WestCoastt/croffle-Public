"use client";
import Button from "@/app/components/Button";
import { Container, Input } from "../../page";
import Link from "next/link";

export default function page() {
  return (
    <Container>
      <div className="title">비밀번호 변경</div>
      <Input placeholder="비밀번호" type="password" />
      {/* <Warning>{message}</Warning> */}
      <Input placeholder="비밀번호 확인" type="password" />
      {/* <Warning>{message}</Warning> */}

      <Link href="/login/find/success/password">
        <Button bg="var(--primary)" content="확인" mt="36px" />
      </Link>
    </Container>
  );
}
