"use client";
import styled from "@emotion/styled";

const Container = styled.div`
  width: 1200px;
  margin: auto;
  padding: 100px 0 50px;
  margin-bottom: 600px;

  h1 {
    margin: 0;
    padding-bottom: 30px;
    border-bottom: 1px solid #000;
    font-size: 24px;
    font-weight: 500;
    letter-spacing: -1.2px;
  }
`;

export default function ShippingInfo() {
  return (
    <Container>
      <h1>배송/교환/반품 안내</h1>
    </Container>
  );
}
