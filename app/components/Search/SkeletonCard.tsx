"use client";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 230px;
  height: 380px;
  padding: 18px 14px;
  border-radius: 10px;
  box-shadow: 0 0 20px 0 rgb(0 0 0 / 10%);

  div {
    width: 200px;
    height: 200px;
    animation: skeleton-gradient 1.5s infinite ease-in-out;
    border-radius: 10px;

    @keyframes skeleton-gradient {
      0% {
        background-color: rgba(165, 165, 165, 0.1);
      }
      50% {
        background-color: rgba(165, 165, 165, 0.3);
      }
      100% {
        background-color: rgba(165, 165, 165, 0.1);
      }
    }
  }
`;

export default function SkeletonCard() {
  return (
    <Container>
      <div></div>
    </Container>
  );
}
