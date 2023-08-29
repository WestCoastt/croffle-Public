"use client";
import { useEffect, useState } from "react";
import { ReviewItem, modalAtom } from "./ReviewContents";
import { useSetAtom } from "jotai";
import Image from "next/image";
import styled from "@emotion/styled";

const Container = styled.div`
  position: fixed;
  z-index: 101;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .bg {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .modal {
    // width: 710px;
    width: 950px;
    height: fit-content;
    background-color: #fff;
    border-radius: 12px;
  }

  .flex {
    display: flex;
    padding: 16px 16px;
  }
  .contents {
    // padding: 16px 0;
  }

  h3 {
    display: flex;
    justify-content: space-between;
    margin: 24px 30px 8px;
    font-size: 24px;
    font-weight: 500;
    letter-spacing: -0.5px;

    img {
      width: 34px;
      padding: 0 8px;
      cursor: pointer;
    }
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 440px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;

  div {
    position: relative;
    // width: 570px;
    width: 475px;
    height: 440px;
  }

  .arrow {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
  }
  .left {
    background: url("/assets/img/arrow_left_no_bg.svg") no-repeat center;
  }
  .right {
    background: url("/assets/img/arrow_right_no_bg.svg") no-repeat center;
  }
  .hide {
    visibility: hidden;
  }
`;

const ImageList = styled.div`
  // width: 570px;
  width: 475px;
  margin: auto;
  padding: 16px 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, 55px);
  gap: 5px;

  div {
    position: relative;
    height: 55px;
    cursor: pointer;
  }
  .selected {
    border: 3px solid #346aff;
  }
`;

const ReviewContainer = styled.div`
  width: 100%;
  font-size: 14px;

  p {
    margin: 0;
    margin-bottom: 4px;
    font-size: 15px;
    font-weight: 500;
  }

  .option {
    font-size: 12px;
    color: #999999;
  }

  .content {
    margin-top: 12px;
    word-break: break-word;
    white-space: pre-wrap;
    color: #333333;
  }
  .dttm {
    padding-top: 14px;
    line-height: 32px;
    font-size: 12px;
    color: #999999;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: fit-content;
  margin-bottom: 8px;

  .star {
    display: flex;
    align-items: center;
    padding-right: 12px;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: -0.8px;

    img {
      width: 18px;
      height: 18px;
      margin-right: 4px;
    }
  }
  .label {
    width: 90px;
    padding: 0 12px;
    height: 18px;
    border-left: 1px solid #eeeeee;
  }
`;

interface ImageModalProps {
  data: {
    idx: number;
    item: ReviewItem;
  };
}

export default function ImageModal({ data }: ImageModalProps) {
  const setModal = useSetAtom(modalAtom);
  const [index, setIndex] = useState(data.idx);

  const handleClose = () => {
    setModal(false);
  };

  const handleIndex = (i: number) => {
    setIndex(i);
  };

  const handleNavigate = (dir: string) => {
    if (dir === "left") {
      index > 0 && setIndex(index - 1);
    } else {
      index + 1 < data.item.review_image.length && setIndex(index + 1);
    }
  };

  return (
    <Container>
      <div className="bg">
        <div className="modal">
          <h3>
            <span>사진 후기</span>
            <img
              src="/assets/img/close.svg"
              alt="close"
              onClick={handleClose}
            />
          </h3>
          <div className="flex">
            <div className="contents">
              <ImageContainer>
                <button
                  className={`arrow left ${index === 0 ? "hide" : ""}`}
                  onClick={() => {
                    handleNavigate("left");
                  }}
                />
                <div>
                  <Image
                    src={data.item.review_image[index].image_url}
                    alt={`image ${data.idx}`}
                    fill={true}
                  />
                </div>
                <button
                  className={`arrow right ${
                    index + 1 === data.item.review_image.length ? "hide" : ""
                  }`}
                  onClick={() => {
                    handleNavigate("right");
                  }}
                />
              </ImageContainer>

              <ImageList>
                {data.item.review_image.map(
                  (item: { image_url: string }, i: number) => (
                    <div className={`${index === i ? "selected" : ""}`} key={i}>
                      <Image
                        src={item.image_url}
                        alt={`image ${i}`}
                        fill={true}
                        onClick={() => {
                          handleIndex(i);
                        }}
                      />
                    </div>
                  )
                )}
              </ImageList>
            </div>
            <ReviewContainer>
              {/* <p>{data.item.account.email.slice(0, 4)}*****</p> */}
              <Header>
                <div className="star">
                  <img src="/assets/img/star_bk_fill.svg" alt="star" />
                  {data.item.star}
                </div>
                <span className="label">
                  {data.item.account.email.slice(0, 4)}*****
                </span>
              </Header>
              <div className="option">{data.item.product_option.name}</div>
              <div className="content">{data.item.content}</div>
              <div className="dttm">
                {data.item.insert_dttm.split("T")[0].replaceAll("-", ".")}
              </div>
            </ReviewContainer>
          </div>
        </div>
      </div>
    </Container>
  );
}
