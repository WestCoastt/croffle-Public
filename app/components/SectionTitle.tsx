"use client";
import styled from "@emotion/styled";

const Container = styled.div`
  margin: auto;
  width: 238px;
`;

const H1 = styled.h1`
  width: 100%;
  margin: 0;
  margin-top: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 36px;
`;

import React from "react";

export default function SectionTitle() {
  return (
    <Container>
      <H1>
        <span>크로플 추천</span>
        <img src="/assets/img/thumbs_up.svg" alt="recommand" />
      </H1>
    </Container>
  );
}
