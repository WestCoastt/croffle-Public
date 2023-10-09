"use client";
import styled from "@emotion/styled";
import Image from "next/image";
import { useState, useEffect, useRef, MouseEvent, use } from "react";
import { atom, useAtom, useSetAtom } from "jotai";
import Rating from "../Rating";
import Quantity from "./Quantity";
import Button, { Btn } from "../Button";
import ZoomViewer from "./ZoomViewer";
import Link from "next/link";
import axios from "axios";
import { useParams, usePathname } from "next/navigation";
import { useCookies } from "react-cookie";

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
  display: grid;
  grid-template-rows: repeat(auto-fill, 96px);
  gap: 5px;

  height: 500px;
  position: relative;
`;

const MainImage = styled.div`
  position: relative;
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
  height: auto;

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
  font-weight: 500;
  span {
    font-size: 20px;
  }
`;

const ShippingContainer = styled.div`
  width: 300px;
  margin-top: 20px;
  font-size: 14px;

  .shipping_info {
    span:first-of-type {
      margin-right: 38px;
    }
  }

  .shipping_fee {
    margin-top: 10px;

    span:first-of-type {
      margin-right: 52px;
    }
  }
  strong {
    font-weight: 500;
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

const TPContainer = styled.div<{ opt: number }>`
  margin-top: ${(props) => (props.opt === 0 ? "94px" : "20px")};
`;

const TotalPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 14px;
  line-height: 34px;

  .total {
    margin-left: 12px;
    color: #e50000;
    font-weight: 700;
  }
  strong {
    font-size: 24px;
  }
`;

const BtnContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Tooltip = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 14px 32px;
  bottom: 62px;
  left: 34px;
  border: 1px solid #999999;
  background-color: #fff;

  a {
    text-decoration: none;
  }
  div {
    color: #666;
    font-size: 14px;
  }

  &::after {
    content: "";
    position: absolute;
    top: 87px;
    left: 107px;
    width: 14px;
    height: 14px;
    background-color: #fff;
    border-top: none;
    border-left: none;
    border-right: 1px solid #999999;
    border-bottom: 1px solid #999999;
    transform: rotate(45deg);
  }
`;

const GotoCartBtn = styled(Btn)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 32px;
  border-radius: 0;
  font-size: 12px;
  letter-spacing: -0.7px;

  img {
    width: 11px;
    height: 11px;
  }
`;

const HeartBtn = styled.button<{ like: boolean }>`
  width: 50px;
  height: 48px;
  border: 1px solid #1d24dd;
  border-radius: 5px;
  background: url(${(props) =>
      props.like ? "/assets/img/heart_filled.svg" : "/assets/img/heart.svg"})
    no-repeat;
  background-position: center;

  @keyframes scaleBackgroundImage {
    0% {
      background-size: 10%;
    }
    100% {
      background-size: 62%;
    }
  }
  animation: ${(props) => props.like && "scaleBackgroundImage 0.15s ease"};

  cursor: pointer;
`;

const CartBtn = styled(Btn)``;

const ZoomLens = styled.div<{ left: number; top: number }>`
  border: 1.5px solid rgb(255, 255, 255);
  background-color: rgba(255, 255, 255, 0.4);
  position: absolute;
  top: ;
  left: ${(props) =>
    props.left <= 0 ? "0" : props.left > 250 ? "250px" : props.left + "px"};
  top: ${(props) =>
    props.top <= 0 ? "0" : props.top > 250 ? "250px" : props.top + "px"};
  width: 250px;
  height: 250px;
`;

interface Option {
  name: string;
  price: number;
  option_sq: number;
  qty: number;
}

interface Detail {
  name: string;
  regular_price: number;
  review_count: number;
  star_average: string;
  total_price: number;
}

export const reviewsAtom = atom("");
export const selectedAtom = atom<Option[]>([]);
export const refreshCartAtom = atom(false);
export default function TopContents() {
  const [details, setDetails] = useState<Detail>();
  const id = useParams().id;
  const sq = usePathname().split("/")[2];
  const [images, setImages] = useState([]);
  const [mainImg, setMainImg] = useState("");
  const [option, setOption] = useState([]);
  const [selected, setSelected] = useState("선택하세요.");
  const [selArr, setSelArr] = useAtom(selectedAtom);
  const setReviews = useSetAtom(reviewsAtom);
  const [dropdown, setDropdown] = useState(false);
  const [like, setLike] = useState(false);
  const [eta, setEta] = useState("");
  const optionRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(false);
  const [coord, setCoord] = useState({ cursorX: 0, cursorY: 0 });
  const zoomRef = useRef<HTMLDivElement>(null);
  const [cookies, setCookie, removeCookie] = useCookies(["sck"]);
  const setRefreshCart = useSetAtom(refreshCartAtom);
  const [tooltip, setTooltip] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const handleCoordinate = (e: MouseEvent<HTMLDivElement>) => {
    if (zoomRef.current)
      setCoord({
        cursorX: e.pageX - zoomRef.current.offsetLeft - 125,
        cursorY: e.pageY - zoomRef.current.offsetTop - 125,
      });
  };

  const discount_rate = Math.floor(
    (1 - Number(details?.total_price) / Number(details?.regular_price)) * 100
  );

  const getDetail = async () => {
    const res = await axios.get(`/v1/products/${id}`);
    const img_res = await axios.get(`/v1/products/${id}/images`);
    const opt_res = await axios.get(`/v1/products/${id}/options`);
    const review_res = await axios.get(
      `/v1/products/${sq}/reviews?sort_type=STAR&page=1&size=10`
    );

    setDetails(res.data.data);
    setOption(opt_res.data.data.list);
    const images = img_res.data.data.list.map(
      (item: { image_url: string }) => item.image_url
    );
    setImages(images);
    setMainImg(images[0]);
    setReviews(review_res.data.data.total_count);
    console.log(res.data.data, opt_res.data.data, review_res.data.data);
  };

  useEffect(() => {
    getDetail();

    const clickOutside = (e: any) => {
      optionRef.current && !optionRef.current.contains(e.target)
        ? setDropdown(false)
        : setDropdown(!dropdown);
    };
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("click", clickOutside);
    };
  }, [optionRef, dropdown]);

  const addToCart = async () => {
    const tk = localStorage.getItem("tk");
    const auth = {
      Authorization: `Bearer ${cookies.sck ? cookies.sck : tk ? tk : ""}`,
    };

    const body = {
      option_sq: selArr[0].option_sq,
      quantity: selArr[0].qty,
    };

    const res = await axios.post(`/v1/products/${id}/carts`, body, {
      headers: auth,
    });
    setTooltip(true);
    setRefreshCart(true);
  };

  useEffect(() => {
    if (!tooltip) return;

    const tooltipTimer = setTimeout(() => {
      setTooltip(false);
    }, 2000);

    return () => {
      clearTimeout(tooltipTimer);
    };
  }, [tooltip]);

  // useEffect(() => {
  //   setEta(getETA());
  // }, [detail]);

  return (
    <Container>
      <div className="wrap">
        <ImageContainer>
          {zoom && mainImg && (
            <ZoomViewer
              src={mainImg}
              left={coord.cursorX}
              top={coord.cursorY}
            />
          )}
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
        <MainImage
          ref={zoomRef}
          onMouseOver={() => setZoom(true)}
          onMouseMove={handleCoordinate}
          onMouseLeave={() => {
            setZoom(false);
          }}
        >
          {zoom && <ZoomLens left={coord.cursorX} top={coord.cursorY} />}
          {mainImg && (
            <Image src={mainImg} alt="main_image" width={500} height={500} />
          )}
        </MainImage>
      </div>
      <InfoContainer>
        <h2>{details?.name}</h2>
        {details && (
          <Rating
            stars={Number(details?.star_average)}
            reviews={Number(details?.review_count)}
          />
        )}
        <PriceContainer>
          <PriceWrapper>
            <div>
              <span>{details?.total_price.toLocaleString()}</span>원
            </div>
            {details?.regular_price && (
              <PriceBox>
                <span className="reg">
                  {details?.regular_price.toLocaleString()}원
                </span>
                <span className="rate">{discount_rate}%</span>
              </PriceBox>
            )}
          </PriceWrapper>
          <CoinWarpper>
            <span>
              {(Number(details?.total_price) / 1000).toLocaleString()}
            </span>
            Croffle
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
              {/* {detail.shipping_fee === 0
                ? "무료"
                : detail.shipping_fee.toLocaleString() + "원"} */}
            </strong>
          </div>
        </ShippingContainer>

        {/* {detail.option &&} */}
        <SelectBox ref={optionRef} dropdown={dropdown}>
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
              alt="option_select"
            />
          </div>

          {dropdown && (
            <ul className="list">
              {option.map(
                (item: { name: string; add_price: number; order: number }) => (
                  <li
                    key={item.name}
                    onClick={() => {
                      setSelected(item.name);
                      if (selArr.map((el) => el.name).includes(item.name)) {
                        alert("이미 선택한 옵션입니다.");
                        return;
                      }
                      setSelArr([
                        ...selArr,
                        {
                          name: item.name,
                          option_sq: item.order,
                          price:
                            item.add_price +
                            (details ? details?.total_price : 0),
                          qty: 1,
                        },
                      ]);
                      setDropdown(false);
                    }}
                  >
                    {item.name}{" "}
                    {item.add_price > 0 && (
                      <span>{` (+${item.add_price}원)`}</span>
                    )}
                  </li>
                )
              )}
            </ul>
          )}
        </SelectBox>

        {selArr.length !== 0 &&
          selArr.map((item, i) => (
            <Quantity key={item.name} item={item} idx={i} />
          ))}
        <TPContainer opt={selArr.length}>
          <TotalPrice>
            <span>합계</span>
            <span className="total">
              <strong>
                {selArr.length === 0
                  ? "0"
                  : selArr
                      .map((item) => item.price * item.qty)
                      .reduce((a, b) => a + b)
                      .toLocaleString()}
              </strong>
              원
            </span>
          </TotalPrice>
          <BtnContainer>
            {tooltip && (
              <Tooltip>
                <div>상품이 장바구니에 담겼습니다.</div>
                <Link href="/cart">
                  <GotoCartBtn clr="var(--primary)" wd="120px" bg="#fff">
                    장바구니로 가기
                    <img
                      src="/assets/img/arrow_right_blue.svg"
                      alt="go_to_cart"
                    />
                  </GotoCartBtn>
                </Link>
              </Tooltip>
            )}
            <HeartBtn
              like={like}
              onClick={() => {
                setLike(!like);
              }}
            />
            <CartBtn
              clr="var(--primary)"
              wd="185px"
              bg="#fff"
              onClick={addToCart}
            >
              장바구니 담기
            </CartBtn>
            <Link href="/order">
              <Button bg="var(--primary)" wd="275px" content="바로구매" />
            </Link>
          </BtnContainer>
        </TPContainer>
      </InfoContainer>
    </Container>
  );
}
