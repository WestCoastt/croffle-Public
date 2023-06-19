import Link from "next/link";
import Button from "@/app/components/Button";
import { BtnBox, Container } from "@/app/login/page";

export default async function Result(props: { params: { slug: string } }) {
  //find페이지에서 api호출로 setAtom(true)로 상태 저장하고 result페이지에서 useAtom으로 상태불러왔을때 true가 아니면 url로 직접 접근한 것으로 보고 홈으로 redirect
  if (props.params.slug === "id") {
    return (
      <Container>
        <div className="title">아이디 찾기</div>
        <span>고객님의 크로플 계정을 찾았습니다.</span>
        <span>아이디 확인 후 로그인해주세요.</span>
        <BtnBox>
          <Link href="/login">
            <Button bg="var(--primary)" content="로그인" />
          </Link>
          <Link href="/find/password">
            <Button clr="var(--primary)" bg="#fff" content="비밀번호 찾기" />
          </Link>
        </BtnBox>
      </Container>
    );
  }
  if (props.params.slug === "password") {
    return (
      <Container>
        <div className="title">비밀번호 찾기</div>
        <span>비밀번호가 변경이 완료되었습니다.</span>
        <span>새로운 비밀번호로 로그인해주세요.</span>

        <Link href="/login">
          <Button bg="var(--primary)" content="로그인" />
        </Link>
      </Container>
    );
  }
}
