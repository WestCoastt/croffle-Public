"use client";
import styled from "@emotion/styled";

const Container = styled.div`
  width: 1200px;
  margin: auto;
  margin-top: 40px;

  div {
    width: fit-content;
    margin: 0 auto;
  }
`;

const image =
  "https://github.com/westcoast-dev/RNCourse-Game/assets/117972001/ea577a55-6c8a-4ad6-b4c3-2b59904632fc";
export default function MiddleContents() {
  return (
    <Container>
      <div>
        <img src={image} alt="product_detail" />
      </div>
    </Container>
  );
}
