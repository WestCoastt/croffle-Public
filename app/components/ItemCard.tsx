"use client";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Rating from "./Rating";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 230px;
  height: 380px;
  padding: 18px 14px;
  border-radius: 10px;

  img {
    border-radius: 10px;
  }
  &:hover {
    box-shadow: 0 0 20px 0 rgb(0 0 0 / 10%);
    transition: box-shadow 0.2s ease;

    img {
      transform: scale(1.03);
      transition: transform 0.2s ease-in;
    }
  }

  .skeleton {
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

const ImageBox = styled.div`
  border-radius: 10px;
  overflow: hidden;
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
    font-size: 13px;
    letter-spacing: -0.5px;
    text-decoration: line-through;
  }
  .rate {
    font-weight: 700;
    font-size: 18px;
    letter-spacing: -1px;
    color: var(--primary);
  }
`;

const DisPrice = styled.span`
  display: block;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -1px;
  em {
    font-style: normal;
    font-size: 18px;
  }
`;

interface ItemCardProps {
  item: {
    sq: number;
    name: string;
    regular_price: number;
    total_price: number;
    star_average: number;
    review_count: number;
    product_image: [{ image_url: string }];
  };
}

export default function ItemCard({ item }: ItemCardProps) {
  const [loaded, setLoaded] = useState(false);

  const discount_rate = Math.floor(
    (1 - item.total_price / item.regular_price) * 100
  );

  return (
    <Link
      href={`/products/${item.sq}`}
      target="_blank"
      style={{ textDecoration: "none", color: "#000" }}
    >
      <Container>
        <ImageBox className={!loaded ? "skeleton" : ""}>
          {item.product_image && (
            <Image
              onLoad={() => setLoaded(true)}
              src={item.product_image[0].image_url}
              alt={item.name}
              width={200}
              height={200}
            />
          )}
        </ImageBox>
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
          {item.star_average && (
            <Rating
              stars={Number(item.star_average)}
              reviews={item.review_count}
            />
          )}
        </ContentBox>
      </Container>
    </Link>
  );
}
