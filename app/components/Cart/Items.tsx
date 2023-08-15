"use client";
import styled from "@emotion/styled";
import OrderItemCard from "./OrderItemCard";

const Container = styled.div`
  width: 1200px;
  margin: auto;
  margin-top: 40px;

  h3 {
    text-align: center;
    margin: 40px 0;
    font-size: 32px;
    font-weight: 500;
    letter-spacing: -1.6px;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export default function Items() {
  return (
    <Container>
      <h3>장바구니</h3>

      <CardContainer>
        <OrderItemCard />
        <OrderItemCard />
      </CardContainer>
    </Container>
  );
}
