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
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: 700;
  span {
    font-size: 32px;
  }
`;
const PriceBox = styled.div`
  display: flex;
  align-items: center;
  .reg {
    font-size: 16px;
    font-weight: 400;
    margin-right: 10px;
    color: #999999;
    text-decoration: line-through;
  }
  .rate {
    font-weight: 700;
    font-size: 24px;
    color: var(--primary);
  }
`;

const CoinWarpper = styled.div`
  color: var(--primary);
  font-size: 14px;
  font-weight: 700;
  span {
    font-size: 20px;
  }
`;

const ShippingContainer = styled.div`
  width: 300px;
  margin-top: 20px;
  font-size: 14px;

  .shipping_info {
    span:first-child {
      margin-right: 38px;
    }
  }

  .shipping_fee {
    margin-top: 10px;

    span:first-child {
      margin-right: 52px;
    }
  }
`;

const SelectBox = styled.div<{ dropdown: boolean }>`
  position: relative;
  width: 100%;
  margin-top: 24px;
  font-size: 14px;
  cursor: pointer;

  .select {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 48px;
    padding: 0 18px;
    border: 1px solid #000;
    border-radius: 5px;
    border-bottom-left-radius: ${(props) => props.dropdown && "0"};
    border-bottom-right-radius: ${(props) => props.dropdown && "0"};

    span {
      width: 470px;
      height: 20px;
      overflow: hidden;
    }
  }

  .list {
    position: absolute;
    width: 100%;
    max-height: 196px;
    margin: 0;
    top: 46px;
    left: 0;
    right: 0;
    z-index: 10;
    padding: 0;
    list-style: none;
    background: #fff;
    border: 1px solid #000;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    overflow-y: scroll;
    list-style: none;

    li {
      padding: 14px 18px;
      &:hover {
        background-color: #f6f7f9;
      }
    }
  }
  .up {
    transform: rotate(180deg);
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
  shipping_fee: 3000,
  estimated_time: "Sat Jul 1 2023 10:23:29 GMT+0900",
  option: [
    "옵션1. 훌라훌라 훌라춤을 춘다 탬버린 비누",
    "옵션2. 손 세정제",
    "옵션3. 탬버린즈 버블버블 액션빔",
    "옵션4. 핸드크림",
    "옵션5. 딥디크 시그니엘 시그니쳐 바디로션",
    "옵션6. 짱구는 못말려 부리부리부리부리 대마왕의 자라나라 머리머리 머머리 탈모 방지 샴푸",
  ],
};

const days = ["일", "월", "화", "수", "목", "금", "토"];
const date = new Date(detail.estimated_time).toLocaleString().split(". ");
const day = new Date(detail.estimated_time).getDay();
const eta = `${date[1] + "/" + date[2]}` + `(${days[day]})`;

export default function TopContents() {
  const [mainImg, setMainImg] = useState(images[0]);
  const [selected, setSelected] = useState("선택하세요.");
  const [dropdown, setDropdown] = useState(false);

  const discount_rate = Math.floor(
    (1 - detail.total_price / detail.regular_price) * 100
  );

  console.log(eta);

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
            <div>
              <span>{detail.total_price.toLocaleString()}</span>원
            </div>
            {detail.regular_price && (
              <PriceBox>
                <span className="reg">
                  {detail.regular_price.toLocaleString()}원
                </span>
                <span className="rate">{discount_rate}%</span>
              </PriceBox>
            )}
          </PriceWrapper>
          <CoinWarpper>
            <span>{(detail.total_price / 1000).toLocaleString()}</span>Croffle
          </CoinWarpper>
        </PriceContainer>
        <ShippingContainer>
          <div className="shipping_info">
            <span>배송정보</span>
            <span>
              <strong>택배배송</strong> {eta} 도착예정
            </span>
          </div>
          <div className="shipping_fee">
            <span>배송비</span>
            <strong>
              {detail.shipping_fee === 0
                ? "무료"
                : detail.shipping_fee.toLocaleString() + "원"}
            </strong>
          </div>
        </ShippingContainer>

        <SelectBox dropdown={dropdown}>
          <div
            className="select"
            onClick={() => {
              setDropdown(!dropdown);
            }}
          >
            <span>{selected}</span>
            <img
              className={dropdown ? "up" : ""}
              src="/assets/img/option_arrow.svg"
              alt="category-select"
            />
          </div>

          {dropdown && (
            <ul className="list">
              {detail.option.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    setSelected(item);
                    setDropdown(false);
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </SelectBox>
      </InfoContainer>
    </Container>
  );
}
