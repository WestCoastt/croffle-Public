"use client";
import styled from "@emotion/styled";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { maskingAtom } from "./DetailContents";
import { reviewsAtom, selectedAtom } from "./TopContents";
import Rating from "../Rating";
import Pagination from "../Pagination";
import { useParams } from "next/navigation";
import axios from "axios";
import ImageModal from "./ImageModal";
import { tabMenuAtom } from "./TabMenu";
import AllImage from "./AllImage";

const Container = styled.div`
  width: 1200px;
  margin: auto;
  padding-top: 100px;

  h1 {
    font-size: 24px;
    font-weight: 500;
    letter-spacing: -1.2px;
    margin-bottom: 24px;
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
    cursor: pointer;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 146px;
  display: flex;
  gap: 11px;
  justify-content: flex-start;
  overflow: hidden;
  img {
    cursor: pointer;
  }

  .more::before {
    content: "+ 더보기";
    color: #fff;
    position: absolute;
    z-index: 9;
    top: 0;
    left: 0;
    width: 162px;
    height: 146px;
    padding-top: 64px;
    text-align: center;
    background: rgba(17, 17, 17, 0.65);
    cursor: pointer;
  }

  div {
    position: relative;
  }
  .more_img {
    position: absolute;
    z-index: 9;
    top: 0;
    left: 0;
    width: 162px;
    height: 146px;
    padding-top: 64px;
    text-align: center;
    background: rgba(17, 17, 17, 0.65);
    cursor: pointer;
  }
  span {
    color: #fff;
    font-weight: 500;
    font-size: 16px;
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
    top: 32px;
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

  .no_review {
    padding: 40px 0;
    text-align: center;
  }
`;

const CardContainer = styled.div`
  margin-bottom: 40px;
`;

const ReviewCard = styled.div`
  padding: 24px 0;
  border-bottom: 1px solid #e5e5e5;

  .contents {
    margin-top: 12px;
    font-size: 15px;
    letter-spacing: -0.75px;
  }
`;
const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: fit-content;

  div {
    display: flex;
    align-items: center;
    padding-right: 12px;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: -0.8px;
  }
  img {
    width: 18px;
    height: 18px;
    margin-right: 4px;
  }
  .label {
    width: 90px;
    padding: 0 12px;
    height: 18px;
    text-align: center;
    border-left: 1px solid #eeeeee;
  }
  span {
    color: #777;
    font-size: 14px;
  }
`;

const PhotoContainer = styled.div`
  display: flex;
  gap: 4px;

  .thumbnail {
    margin-top: 18px;
    cursor: pointer;
  }
`;

export interface ReviewItem {
  account: { email: string };
  content: string;
  insert_dttm: string;
  product_option: any;
  review_image: { image_url: string }[];
  star: number;
}

export const reviewAtom = atom(0);
export const modalAtom = atom(false);
export const imageReview = atom(false);
export const allImageAtom = atom(false);
export default function ReviewContents() {
  const sort_by = [
    { name: "평점높은순", type: "STAR" },
    { name: "최신순", type: "DATE" },
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

  const sq = useParams().id;
  const reviewRef = useRef<HTMLDivElement>(null);
  const tabMenu = useAtomValue(tabMenuAtom);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const setReviewTop = useSetAtom(reviewAtom);
  const masking = useAtomValue(maskingAtom);
  const selArr = useAtomValue(selectedAtom);
  const [dropdown, setDropdown] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const [sort, setSort] = useState(sort_by[0]);
  const sortRef = useRef<HTMLDivElement>(null);
  const [modal, setModal] = useAtom(modalAtom);
  const [imageReview, setImageReview] = useAtom(allImageAtom);
  const [allImage, setAllImage] = useAtom(allImageAtom);
  const [images, setImages] = useState({
    idx: 0,
    item: {
      account: { email: "" },
      content: "",
      insert_dttm: "",
      product_option: "",
      review_image: [{ image_url: "" }],
      star: 0,
    },
  });
  const [imgReviews, setImgReviews] = useState([]);

  useEffect(() => {
    reviewRef.current && setReviewTop(reviewRef.current?.offsetTop - 120);
  }, [reviewRef, masking, selArr]);

  useEffect(() => {
    tabMenu === "review" && reviewRef.current?.scrollIntoView();
  }, [tabMenu]);

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

  const getReviews = async () => {
    const res = await axios.get(
      `/v1/products/${sq}/reviews?sort_type=${sort.type}&page=${page}&size=10`
    );
    setReviews(res.data.data.list);
    setTotal(res.data.data.total_count);
  };

  const getImageReviews = async () => {
    const res = await axios.get(
      `/v1/products/${sq}/reviews?sort_type=STAR&page=1&size=10&is_image=true`
    );
    const a = res.data.data.list.map((item: any) =>
      item.review_image.map((el: any) => ({
        id: item.account,
        content: item.content,
        insert_dttm: item.insert_dttm,
        img: el.image_url,
      }))
    );
    setImgReviews(a.flat());
    // console.log(res.data.data.list);
  };

  useEffect(() => {
    getImageReviews();
  }, []);

  useEffect(() => {
    getReviews();
    imgRef.current?.scrollIntoView();
    // reviewRef.current && window.scrollTo(0, reviewRef.current?.offsetTop - 60);
  }, [page, sort]);

  const handleDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toISOString().split("T")[0].replaceAll("-", ".");
  };

  const handleImage = (item: ReviewItem, i: number) => {
    setModal(true);
    setImages({ idx: i, item: item });
  };

  const handleImages = (i: number) => {
    i < 6 && console.log("wait...");
    i === 6 && setAllImage(true);
  };

  useEffect(() => {
    modal
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");

    allImage
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [modal, allImage]);

  return (
    <Container ref={reviewRef}>
      {modal && <ImageModal data={images} />}
      {allImage && <AllImage sq={sq} page={page} />}
      {/* <h1>고객리뷰({Number(reviews.length).toLocaleString()})</h1> */}
      <RateContainer>
        <div className="stars">{detail.stars}</div>
        <div className="wrapper">
          <Rating bk={true} stars={detail.stars} reviews={detail.reviews} />
          <p>총 {total.toLocaleString()}건 리뷰</p>
        </div>
      </RateContainer>

      <div>
        <ReveiwsHeader>
          {/* <span className="title">포토&동영상 리뷰(12)</span>
          <span className="more">더보기 {">"}</span> */}
        </ReveiwsHeader>

        <ImageContainer ref={imgRef}>
          {imgReviews.slice(0, 7).map((item: any, i: number) => (
            <div
              className={`wrapper ${i === 6 ? "more" : ""}`}
              key={item.img + i}
              onClick={() => {
                handleImages(i);
              }}
            >
              <Image src={item.img} alt="review" width={162} height={146} />
            </div>
          ))}
        </ImageContainer>

        <SortContainer>
          <SortBox ref={sortRef} dropdown={dropdown}>
            <div
              className="select"
              onClick={() => {
                setDropdown(!dropdown);
              }}
            >
              <span>{sort.name}</span>
              <img
                className={dropdown ? "up" : ""}
                src="/assets/img/option_arrow.svg"
                alt="sort_by"
              />
            </div>
            {dropdown && (
              <ul>
                {sort_by.map((item: { name: string; type: string }) => (
                  <li
                    key={item.name}
                    onClick={() => {
                      setSort(item);
                      setDropdown(false);
                    }}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </SortBox>
        </SortContainer>
      </div>
      <ReviewsContainer>
        {detail.reviews === 0 ? (
          <div className="no_review">등록된 리뷰가 없습니다.</div>
        ) : (
          <CardContainer>
            {reviews.map((item, i) => (
              <ReviewCard key={item.account.email + i}>
                <CardHeader>
                  <div>
                    <img src="/assets/img/star_bk_fill.svg" alt="star" />
                    {item.star}
                  </div>
                  <span className="label">
                    {item.account.email.slice(0, 4)}*****
                  </span>
                  <span className="label">{handleDate(item.insert_dttm)}</span>
                </CardHeader>
                <div className="contents">{item.content}</div>
                <PhotoContainer>
                  {item.review_image &&
                    item.review_image.map((el, i) => (
                      <Image
                        className="thumbnail"
                        key={i}
                        src={el.image_url}
                        alt="review image thumbnail"
                        width={120}
                        height={120}
                        onClick={() => handleImage(item, i)}
                      />
                    ))}
                </PhotoContainer>
              </ReviewCard>
            ))}
          </CardContainer>
        )}
        <Pagination
          total_page={Math.ceil(total / 10)}
          c_page={page}
          setPage={setPage}
        />
      </ReviewsContainer>
    </Container>
  );
}
