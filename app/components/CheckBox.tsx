"use client";
import { useState } from "react";
import styled from "@emotion/styled";

const Check = styled.input<{ check: boolean; sm?: boolean }>`
  width: ${(props) => (props.sm ? "20px" : "24px")};
  height: ${(props) => (props.sm ? "20px" : "24px")};
  margin-right: 6px;
  vertical-align: middle;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;

  &::before {
    width: ${(props) => (props.sm ? "20px" : "24px")};
    height: ${(props) => (props.sm ? "20px" : "24px")};
    content: "";
    display: block;
    background: url(${(props) =>
        props.check ? "/assets/img/checked.svg" : "/assets/img/unchecked.svg"})
      center no-repeat;
    border: 0;
    background-size: cover;
  }
`;

const Label = styled.label<{ sm?: boolean }>`
  font-size: ${(props) => (props.sm ? "13px" : "14px")};
  vertical-align: middle;
  cursor: pointer;
`;

interface CheckBoxProps {
  label: string;
  sm?: boolean;
}

export default function CheckBox({ label, sm }: CheckBoxProps) {
  //if(label === "로그인 상태 유지" && checked) { const [cookies, setCookie, removeCookie] = useCookies()}
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <Check
        id={label}
        type="checkbox"
        check={checked}
        sm={sm}
        onChange={() => {
          setChecked(!checked);
        }}
      />
      <Label sm={sm} htmlFor={label}>
        {label}
      </Label>
    </div>
  );
}
