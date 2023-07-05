"use client";
import styled from "@emotion/styled";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { maskingAtom } from "./DetailContents";
import { selectedAtom } from "./TopContents";
import Rating from "../Rating";

const Container = styled.div`
  width: 1200px;
  margin: auto;
  padding: 100px 0 50px;
  // margin-top: 100px;
  margin-bottom: 600px;

  h1 {
    font-size: 24px;
    font-weight: 500;
    letter-spacing: -1.2px;
  }
`;

const RateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 44px 0;
  border-radius: 5px;
  border: 1px solid #e5e5e5;

  .stars {
    font-size: 45px;
    font-family: Noto Sans KR;
    letter-spacing: -2.25px;
  }

  p {
    margin: 0;
    margin-top: 4px;
    text-align: center;
  }
  .wrapper {
    margin-left: 20px;
  }
`;

const ReveiwsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0 20px;

  .title {
    font-size: 20px;
    letter-spacing: -1px;
  }
  .more {
    font-size: 15px;
    letter-spacing: -0.75px;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  img {
    cursor: pointer;
  }
`;

const SortContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  margin-top: 30px;
  padding-bottom: 16px;
  border-bottom: 1px solid #000;
`;

const SortBox = styled.div<{ dropdown: boolean }>`
  position: relative;
  width: 140px;
  cursor: pointer;
  font-size: 14px;
  letter-spacing: -0.7px;

  ul {
    width: 140px;
    position: absolute;
    left: 0;
    top: 28px;
    padding: 0;
    z-index: 9;
    list-style: none;
    border: 1px solid #000;
    border-radius: 5px;
    border-top-left-radius: ${(props) => props.dropdown && "0"};
    border-top-right-radius: ${(props) => props.dropdown && "0"};
    background-color: #fff;
    overflow: hidden;
  }
  li {
    padding: 14px 18px;
    &:hover {
      background-color: #f6f7f9;
    }
  }
  .select {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 18px;
    border: 1px solid #000;
    border-radius: 5px;
  }
  .up {
    transform: rotate(180deg);
  }
`;

const ReviewsContainer = styled.div`
  padding: 24px 24px 0;
`;

export const reviewAtom = atom(0);
export default function ReviewContents() {
  const sort_by = ["추천순", "최신순", "평점높은순", "평점낮은순"];
  const detail = {
    product_id: 6,
    name: "탬버린즈 퍼퓸 솝 비누",
    regular_price: 49290,
    total_price: 36700,
    stars: 3.4,
    reviews: 6178,
    src: "https://github.com/westcoast-dev/nextjs-course/assets/117972001/fde3989f-bc08-4909-8298-ed4322be612d",
    shipping_fee: 3000,
    estimated_time: "Sun Jul 2 2023 10:23:29 GMT+0900",
    option: [
      {
        name: "옵션1. 훌라훌라 훌라춤을 춘다 탬버린 비누",
        price: 32000,
        qty: 1,
      },
      { name: "옵션2. 손 세정제", price: 7900, qty: 1 },
      { name: "옵션3. 탬버린즈 버블버블 액션빔", price: 18900, qty: 1 },
      { name: "옵션4. 핸드크림", price: 11400, qty: 1 },
      {
        name: "옵션5. 딥디크 시그니엘 시그니쳐 어메니티 세트",
        price: 179000,
        qty: 1,
      },
      {
        name: "옵션6. 짱구는 못말려 부리부리부리부리 대마왕의 자라나라 머리머리 머머리 탈모 방지 샴푸",
        price: 338400,
        qty: 1,
      },
    ],
  };
  const reviewRef = useRef<HTMLDivElement>(null);
  const setReviewTop = useSetAtom(reviewAtom);
  const masking = useAtomValue(maskingAtom);
  const selArr = useAtomValue(selectedAtom);
  const [dropdown, setDropdown] = useState(false);
  const [sort, setSort] = useState("추천순");
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    reviewRef.current && setReviewTop(reviewRef.current?.offsetTop - 120);
  }, [reviewRef, masking, selArr]);

  useEffect(() => {
    const clickOutside = (e: any) => {
      sortRef.current && !sortRef.current.contains(e.target)
        ? setDropdown(false)
        : setDropdown(!dropdown);
    };
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("click", clickOutside);
    };
  }, [sortRef, dropdown]);

  return (
    <Container ref={reviewRef}>
      <h1>고객리뷰({detail.reviews})</h1>
      <RateContainer>
        <div className="stars">{detail.stars}</div>
        <div className="wrapper">
          <Rating bk={true} stars={detail.stars} reviews={detail.reviews} />
          <p>총 {detail.reviews}건 리뷰</p>
        </div>
      </RateContainer>

      <div>
        <ReveiwsHeader>
          <span className="title">포토&동영상 리뷰(12)</span>
          <span className="more">더보기 {">"}</span>
        </ReveiwsHeader>
        <ImageContainer>
          <Image
            src="https://github.com/westcoast-dev/RNCourse-Game/assets/117972001/55e8c950-06b6-45fd-8abd-cd8e23628eb9"
            alt="review"
            width={162}
            height={146}
          />
          <Image
            src="https://github.com/westcoast-dev/RNCourse-Game/assets/117972001/55e8c950-06b6-45fd-8abd-cd8e23628eb9"
            alt="review"
            width={162}
            height={146}
          />
          <Image
            src="https://github.com/westcoast-dev/RNCourse-Game/assets/117972001/55e8c950-06b6-45fd-8abd-cd8e23628eb9"
            alt="review"
            width={162}
            height={146}
          />
          <Image
            src="https://github.com/westcoast-dev/RNCourse-Game/assets/117972001/55e8c950-06b6-45fd-8abd-cd8e23628eb9"
            alt="review"
            width={162}
            height={146}
          />
          <Image
            src="https://github.com/westcoast-dev/RNCourse-Game/assets/117972001/55e8c950-06b6-45fd-8abd-cd8e23628eb9"
            alt="review"
            width={162}
            height={146}
          />
          <Image
            src="https://github.com/westcoast-dev/RNCourse-Game/assets/117972001/55e8c950-06b6-45fd-8abd-cd8e23628eb9"
            alt="review"
            width={162}
            height={146}
          />
          <Image
            src="https://github.com/westcoast-dev/RNCourse-Game/assets/117972001/55e8c950-06b6-45fd-8abd-cd8e23628eb9"
            alt="review"
            width={162}
            height={146}
          />
        </ImageContainer>

        <SortContainer>
          <SortBox ref={sortRef} dropdown={dropdown}>
            <div
              className="select"
              onClick={() => {
                setDropdown(!dropdown);
              }}
            >
              <span>{sort}</span>
              <img
                className={dropdown ? "up" : ""}
                src="/assets/img/option_arrow.svg"
                alt="sort_by"
              />
            </div>
            {dropdown && (
              <ul>
                {sort_by.map((item: string) => (
                  <li
                    key={item}
                    onClick={() => {
                      setSort(item);
                      setDropdown(false);
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </SortBox>
        </SortContainer>
      </div>
      <ReviewsContainer>
        <div>리뷰1 입니다.</div>
        <div>리뷰2 입니다.</div>
        <div>리뷰3 입니다.</div>
        <div>리뷰4 입니다.</div>
        <div>리뷰5 입니다.</div>
        <div>리뷰6 입니다.</div>
        <div>리뷰7 입니다.</div>
        <div>리뷰8 입니다.</div>
        <div>리뷰9 입니다.</div>
      </ReviewsContainer>
    </Container>
  );
}
