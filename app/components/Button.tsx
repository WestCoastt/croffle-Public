"use client";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";

const Btn = styled.button<{
  bg?: string;
  clr?: string;
  wd?: string;
  mt?: string;
}>`
  width: ${(props) => (props.wd ? props.wd : "100%")};
  height: 48px;
  font-size: 15px;
  margin-top: ${(props) => (props.mt ? props.mt : 0)};
  color: ${(props) => (props.clr ? props.clr : "#fff")};
  background-color: ${(props) => (props.bg ? props.bg : "#fff")};
  border: ${(props) => (props.clr ? `1px solid ${props.clr}` : 0)};
  border-radius: 5px;
  cursor: pointer;
`;

interface ButtonProps {
  content: string;
  bg?: string;
  clr?: string;
  wd?: string;
  mt?: string;
}

export default function Button({ content, bg, clr, wd, mt }: ButtonProps) {
  const router = useRouter();
  const handleClick = () => {
    if (content === "회원가입") router.push("/signup");
  };

  return (
    <Btn bg={bg} clr={clr} wd={wd} mt={mt} onClick={handleClick}>
      {content}
    </Btn>
  );
}
