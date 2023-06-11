"use client";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 228px;
  height: 370px;
  padding: 14px 14px;
  border-radius: 10px;

  img {
    border-radius: 10px;
  }
  &:hover {
    box-shadow: 0 0 20px 0 rgb(0 0 0 / 10%);
    transition: box-shadow 0.2s ease;

    img {
      transform: scale(1.02);
      transition: transform 0.2s ease-in;
    }
  }
`;

const ContentBox = styled.div`
  flex: 1;
  display: flex;
  margin-top: 14px;
  flex-direction: column;
  justify-content: space-between;
`;

const Name = styled.span`
  display: block;
  width: 200px;
  max-height: 46px;
  margin-bottom: 4px;
  overflow: hidden;
`;

const PriceBox = styled.div`
  display: flex;
  align-items: center;

  .reg {
    display: block;
    margin-right: 6px;
    color: #999999;
    text-decoration: line-through;
  }
  .rate {
    font-weight: 700;
    font-size: 18px;
    color: var(--primary);
  }
`;

const DisPrice = styled.span`
  display: block;
  font-size: 16px;
  font-weight: 700;
  em {
    font-style: normal;
    font-size: 18px;
  }
`;

const Grade = styled.div`
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

interface ItemCardProps {
  item: {
    name: string;
    regular_price: number;
    total_price: number;
    stars: number;
    reviews: number;
    src: string;
  };
}

export default function ItemCard({ item }: ItemCardProps) {
  const discount_rate = Math.floor(
    (1 - item.total_price / item.regular_price) * 100
  );

  const fill =
    item.stars % 1 > 0.5
      ? new Array(Math.round(item.stars)).fill("")
      : new Array(Math.floor(item.stars)).fill("");
  const half = 0 < item.stars % 1 && item.stars % 1 <= 0.5;
  const empty =
    5 - item.stars >= 1 ? new Array(Math.floor(5 - item.stars)).fill("") : null;

  return (
    <Link
      href="/item"
      target="_blank"
      style={{ textDecoration: "none", color: "#000" }}
    >
      <Container>
        <Image src={item.src} alt={item.name} width={200} height={200} />
        <ContentBox>
          <div>
            <Name>{item.name}</Name>
            {item.regular_price !== item.total_price && (
              <PriceBox>
                <span className="reg">
                  {item.regular_price.toLocaleString()}원
                </span>
                <span className="rate">{discount_rate}%</span>
              </PriceBox>
            )}
            <DisPrice>
              <em>{item.total_price.toLocaleString()}</em>원
            </DisPrice>
          </div>

          <Grade>
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
            <span>{item.stars}</span>
            <span>(리뷰 {item.reviews.toLocaleString()}개)</span>
          </Grade>
        </ContentBox>
      </Container>
    </Link>
  );
}
