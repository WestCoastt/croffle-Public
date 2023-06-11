"use client";
import { useSearchParams } from "next/navigation";
import styled from "@emotion/styled";
const Container = styled.div`
  width: 960px;
  padding: 40px 0 0 20px;

  span {
    font-weight: 500;
  }
`;

export default function SearchContent() {
  const keyword = useSearchParams().get("keyword");
  return (
    <Container>
      <span>&apos;{keyword}&apos;</span>에 대한 검색결과
    </Container>
  );
}
