"use client";
import styled from "@emotion/styled";
import Image from "next/image";
import { useState } from "react";
import Rating from "../Rating";

const Container = styled.div`
  width: 1200px;
  margin: auto;
  margin-top: 40px;
  display: flex;
  justify-content: space-between;

  .wrap {
    display: flex;
    justify-content: space-between;
    width: 610px;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 500px;
`;

const ImageWrapper = styled.div<{ selected?: boolean }>`
  width: 96px;
  height: 96px;
  border: ${(props) => props.selected && "1px solid #000"};
  overflow: hidden;

  img {
    display: block;
  }
  &:hover {
    cursor: pointer;
  }
`;

const InfoContainer = styled.div`
  width: 530px;
  height: 500px;

  h2 {
    margin: 0;
    margin-bottom: 6px;
    font-weight: bold;
  }
`;

const PriceContainer = styled.div`
  margin-top: 16px;
`;

const PriceWrapper = styled.div`
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: 700;
  span {
    font-size: 32px;
  }
`;
const CoinWarpper = styled.div`
  color: var(--primary);
  font-size: 14px;
  font-weight: 500;
  span {
    font-size: 20x;
  }
`;

const images = [
  "https://github.com/westcoast-dev/RNCourse-Game/assets/117972001/55e8c950-06b6-45fd-8abd-cd8e23628eb9",
  "https://github.com/westcoast-dev/RNCourse-Game/assets/117972001/e41bf8d5-cd5b-44cd-8988-fe591ae58cc7",
  "https://github.com/westcoast-dev/RNCourse-Game/assets/117972001/4f2ce1f0-2c51-47ed-b34b-550e6aa55579",
  "https://github.com/westcoast-dev/RNCourse-Game/assets/117972001/b9c976d9-27b4-4c5f-bace-7088b21fca9d",
  "https://github.com/westcoast-dev/RNCourse-Game/assets/117972001/69c51164-00b5-485c-b83d-626695886b8e",
];

const detail = {
  product_id: 6,
  name: "탬버린즈 퍼퓸 솝 비누",
  regular_price: 49290,
  total_price: 36700,
  stars: 3.4,
  reviews: 6178,
  src: "https://github.com/westcoast-dev/nextjs-course/assets/117972001/fde3989f-bc08-4909-8298-ed4322be612d",
};

export default function TopContents() {
  const [mainImg, setMainImg] = useState(images[0]);

  return (
    <Container>
      <div className="wrap">
        <ImageContainer>
          {images.map((item, i) => (
            <ImageWrapper key={item} selected={item === mainImg}>
              <Image
                src={item}
                alt={i.toString()}
                width={96}
                height={96}
                onClick={() => {
                  setMainImg(item);
                }}
              />
            </ImageWrapper>
          ))}
        </ImageContainer>
        <Image src={mainImg} alt="main_image" width={500} height={500} />
      </div>
      <InfoContainer>
        <h2>{detail.name}</h2>
        <Rating stars={detail.stars} reviews={detail.reviews} />
        <PriceContainer>
          <PriceWrapper>
            <span>{detail.total_price.toLocaleString()}</span>원
          </PriceWrapper>
          <CoinWarpper>
            <span>{(detail.total_price / 1000).toLocaleString()}</span>Croffle
          </CoinWarpper>
        </PriceContainer>
      </InfoContainer>
    </Container>
  );
}
