"use client";
import { useSearchParams } from "next/navigation";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  background-color: #fafafa;
  border: 1px solid #eeeeee;

  div {
    display: flex;
    align-items: center;
    width: 1200px;
    margin: auto;
  }

  .category {
    color: #555555;
  }

  .arrow {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url("/assets/img/search_header_arrow.svg") no-repeat center;
  }
`;

export default function SearchHeader() {
  const keyword = useSearchParams().get("keyword");
  return (
    <Container>
      <div>
        <span className="category">전체</span>
        <span className="arrow" />
        <span>&apos;{keyword}&apos;</span>
      </div>
    </Container>
  );
}
