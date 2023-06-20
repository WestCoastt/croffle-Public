"use client";
import styled from "@emotion/styled";

const Container = styled.div`
  margin: auto;
  width: fit-content;
`;

const H1 = styled.h1`
  width: 100%;
  margin: 0;
  margin-top: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 36px;

  span {
    margin-right: 12px;
  }
`;

import React from "react";

export default function SectionTitle() {
  return (
    <Container>
      <H1>
        <span>주간 인기 상품</span>
        <img src="/assets/img/fire.svg" alt="weekly-hot-items" />
      </H1>
    </Container>
  );
}
