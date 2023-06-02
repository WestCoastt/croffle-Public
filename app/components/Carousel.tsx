"use client";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";

const Container = styled.div<{ url: string }>`
position: relative;
  background-color: #ebe9e9;
  // height: 500px;
  height: 450px;

  .banner {
    height: 450px;
    background: url(${(props) => props.url}) no-repeat center;
    transition: 0.3s ease-in-out 0s;

    .arrow {
      opacity: 0;
    }
    &:hover {
      .arrow {
        opacity: 1;
        transition: all 0.5s ease 0s;
      }
    }
  }

  .arrow {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
  }
  .left {
    right: 50%;
    margin: auto 640px auto 0px;
    background: rgba(196, 196, 196, 0.2) url("/assets/img/arrow_left.svg") no-repeat center;
  }
  .right {
    left: 50%;
    margin: auto 0px auto 640px;
    background: rgba(196, 196, 196, 0.2) url("/assets/img/arrow_right.svg") no-repeat center;
  }
  }
`;

const PaginationBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100px;
  position: absolute;
  left: 50%;
  margin-left: -80px;
  bottom: 20px;
`;

const Pause = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  padding: 9px 0;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;

  .pause {
    margin: auto;
    width: 9px;
    height: 10px;
    color: #fff;
    border: solid;
    border-width: 0px 3px 0px 3px;
  }
  .play {
    margin: 0 7px 0 11px;
    width: 10px;
    height: 10px;
    border-style: solid;
    border-width: 5px 0px 5px 9px;
    border-color: transparent transparent transparent #fff;
  }
`;

const Pagination = styled.div`
  width: 60px;
  height: 28px;
  line-height: 26px;
  text-align: center;
  border-radius: 100px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
  background-color: rgba(0, 0, 0, 0.5);

  .current {
    color: #fff;
  }
`;

export default function Carousel() {
  const [carousel, setCarousel] = useState(1);
  const [pause, setPause] = useState(false);
  const banners = [
    "/assets/img/main_banner_sample.jpg",
    "/assets/img/main_banner_sample1.jpg",
    "/assets/img/main_banner_sample2.jpg",
  ];

  const handleCarousel = (e: any) => {
    if (e.target.className.includes("left")) {
      carousel === 0
        ? setCarousel(banners.length - 1)
        : setCarousel(carousel - 1);
    } else {
      carousel === banners.length - 1
        ? setCarousel(0)
        : setCarousel(carousel + 1);
    }
  };

  useEffect(() => {
    if (pause) return;
    const timer = setInterval(() => {
      carousel < banners.length - 1
        ? setCarousel(carousel + 1)
        : setCarousel(0);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [carousel, pause]);

  return (
    <Container url={banners[carousel]}>
      <div className="banner">
        <button className="arrow left" onClick={handleCarousel}></button>
        <button className="arrow right" onClick={handleCarousel}></button>
        <PaginationBox>
          <Pause onClick={() => setPause(!pause)}>
            {pause ? <div className="play" /> : <div className="pause" />}
          </Pause>
          <Pagination>
            <span className="current">{carousel + 1}</span> / {banners.length}
          </Pagination>
        </PaginationBox>
      </div>
    </Container>
  );
}
