"use client";
import styled from "@emotion/styled";
const Container = styled.div`
  width: 240px;
  height: 740px;
  border: 1px solid #eeeeee;
  p {
    font-weight: 500;
    padding: 20px;
  }
`;

const FilterBox = styled.div`
  padding: 20px;
  font-weight: 500;
  border-top: 1px solid #eeeeee;
`;

export default function SearchFilter() {
  return (
    <Container>
      <p>필터</p>
      <FilterBox>카테고리</FilterBox>
      <FilterBox>배송/혜택</FilterBox>
      <FilterBox>가격</FilterBox>
    </Container>
  );
}
