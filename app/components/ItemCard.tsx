"use client";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";

const Container = styled.div`
  width: 228px;
  height: 362px;
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

const Name = styled.span`
  display: block;
  width: 200px;
  max-height: 46px;
  margin-bottom: 4px;
  overflow: hidden;
`;

const PriceBox = styled.div`
  display: flex;

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

const RegPrice = styled.span`
  display: block;
  color: #999999;
  text-decoration: line-through;
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

  return (
    <Link
      href="/item"
      target="_blank"
      style={{ textDecoration: "none", color: "#000" }}
    >
      <Container>
        <Image src={item.src} alt={item.name} width={200} height={200} />
        <Name>{item.name}</Name>
        {item.regular_price !== item.total_price && (
          <PriceBox>
            <span className="reg">{item.regular_price.toLocaleString()}원</span>
            <span className="rate">{discount_rate}%</span>
          </PriceBox>
        )}
        <DisPrice>
          <em>{item.total_price.toLocaleString()}</em>원
        </DisPrice>
      </Container>
    </Link>
  );
}
