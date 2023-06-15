"use client";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-left: 4px;
    font-size: 12px;
  }
`;

const StarBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 88px;

  img {
    width: 18px;
    height: 18px;
  }
`;

interface StarsProps {
  stars: number;
  reviews: number;
}

export default function Rating({ stars, reviews }: StarsProps) {
  const fill =
    stars % 1 > 0.5
      ? new Array(Math.round(stars)).fill("")
      : new Array(Math.floor(stars)).fill("");
  const half = 0 < stars % 1 && stars % 1 <= 0.5;
  const empty =
    5 - stars >= 1 ? new Array(Math.floor(5 - stars)).fill("") : null;
  return (
    <Container>
      <StarBox>
        {fill.map((a, i) => (
          <img key={i} src="/assets/img/star_fill.svg" alt="star" />
        ))}
        {half && <img src="/assets/img/star_half.svg" alt="star" />}
        {empty &&
          empty.map((a, i) => (
            <img key={i} src="/assets/img/star_empty.svg" alt="star" />
          ))}
      </StarBox>
      <span>{stars}</span>
      <span>(리뷰 {reviews.toLocaleString()}개)</span>
    </Container>
  );
}
