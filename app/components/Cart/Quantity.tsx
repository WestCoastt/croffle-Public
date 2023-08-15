"use client";
import styled from "@emotion/styled";
import { useAtom } from "jotai";
import { ChangeEvent, useState } from "react";

const QuantityContainer = styled.div`
  // background: #fafafa;
  border-radius: 5px;
  margin-top: 12px;
  // padding: 20px 18px;

  div {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }
  .option_name {
    color: #555555;
    width: 460px;
    max-height: 46px;
    overflow: hidden;
  }

  .QuantityBox {
    margin-top: 24px;

    span {
      font-weight: 700;
    }
  }
  .qty {
    display: flex;
    align-items: center;
    border: 1px solid #e5e5e5;
    border-radius: 2px;
  }
  input {
    width: 40px;
    height: 28px;
    text-align: center;
    border: 0;
    border-left: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
  }
  button {
    width: 27px;
    height: 27px;
    padding: 0;
    border: none;
    background: initial;
    cursor: pointer;
  }
  .dec {
    background: url("/assets/img/dec.svg");
    background-position: center;
  }
  .dec_blocked {
    background: url("/assets/img/dec_blocked.svg");
    background-position: center;
  }
  .inc {
    background: url("/assets/img/inc.svg");
    background-position: center;
  }
`;

export default function Quantity() {
  // export default function Quantity({ item, idx }: QuantityProps) {
  const [qty, setQty] = useState(1);

  return (
    <QuantityContainer>
      <div className="QuantityBox">
        <div className="qty">
          <button
            // className="dec_blocked"
            className={qty === 1 ? "dec_blocked" : "dec"}
            onClick={() => {
              if (qty === 1) return;
              setQty(qty - 1);
            }}
          />
          <input
            type="text"
            value={qty}
            onInput={(e: any) =>
              (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
            }
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const value = Number(e.target.value);
              if (value <= 0) return;
              setQty(value);
            }}
          />
          <button
            className="inc"
            onClick={() => {
              setQty(qty + 1);
            }}
          />
        </div>
      </div>
    </QuantityContainer>
  );
}
