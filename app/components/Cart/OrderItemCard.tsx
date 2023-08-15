"use client";
import styled from "@emotion/styled";
import Image from "next/image";
import Quantity from "./Quantity";

const Container = styled.div`
  width: 100%;
  border-top: 1px solid #000;

  .content {
    display: flex;
    height: 148px;
  }
  .title {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 20px;

    input {
      width: 16px;
      height: 16px;
      margin: 0 10px 0 20px;
    }
    .name {
      color: #000;
      font-size: 16px;
      letter-spacing: -0.8px;
    }
    p {
      color: #888;
      margin: 0;
      margin-top: 10px;
      font-size: 14px;
      letter-spacing: -0.7px;
    }
  }

  .pd {
    width: 100%;
    padding: 25px 30px;
    border-left: 1px solid #e5e5e5;
    font-weight: 500;
    letter-spacing: -0.7px;
  }
  .qty {
    max-width: 156px;
  }
  .fee {
    max-width: 133px;
  }
  .price {
    max-width: 214px;
  }

  .price_bar {
    display: flex;
    justify-content: center;
    gap: 30px;
    padding: 10px 0;
    background: #f9f9f9;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;

    div {
      color: #555;
      font-size: 14px;
      letter-spacing: -0.7px;
    }
    .plus {
      padding: 0 16px;
    }
    .fw {
      padding-left: 6px;
    }
    .fw,
    .order_price {
      color: #000;
      font-size: 16px;
      font-weight: 500;
      letter-spacing: -0.8px;
    }
    .order {
      color: #000;
      padding-right: 10px;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: -0.7px;
    }
  }
`;

export default function OrderItemCard() {
  return (
    <Container>
      <div className="content">
        <div className="title">
          <input type="checkbox" name="product" />
          <Image
            src="https://github.com/westcoast-dev/RNCourse-Game/assets/117972001/55e8c950-06b6-45fd-8abd-cd8e23628eb9"
            alt="상품"
            width={110}
            height={110}
          />
          <div>
            <div className="name">탬버린즈 퍼퓸 솝 비누</div>
            <p className="eta">8/19(토) 도착 예정</p>
          </div>
        </div>
        <div className="qty pd">
          <div>수량</div>
          <div>
            <Quantity />
          </div>
        </div>
        <div className="fee pd">배송비</div>
        <div className="price pd">상품가격</div>
      </div>
      <div className="price_bar">
        <div>
          <span>상품금액</span>
          <span className="fw">32,000원</span>
          <span className="plus">+</span>
          <span>배송비</span>
          <span className="fw">3,000원</span>
        </div>

        <div className="order_price">
          <span className="order">주문금액 :</span>35,000원
        </div>
      </div>
    </Container>
  );
}
