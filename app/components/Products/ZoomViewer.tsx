"use client";
import styled from "@emotion/styled";

const Container = styled.div<{ url: string; left: number; top: number }>`
  position: absolute;
  left: 624px;
  z-index: 11;

  width: 500px;
  height: 500px;
  // background-color: #393675;
  background: url(${(props) => props.url}) no-repeat;
  // background-position: -0px -0px;
  background-position-x: ${(props) =>
    props.left <= 0
      ? "0"
      : props.left > 250
      ? "-500px"
      : "-" + props.left * 2 + "px"};
  background-position-y: ${(props) =>
    props.top <= 0
      ? "0"
      : props.top > 250
      ? "-500px"
      : "-" + props.top * 2 + "px"};
  background-size: 1000px 1000px;
`;

interface ZoomViewerProps {
  src: string;
  left: number;
  top: number;
}

export default function ZoomViewer({ src, left, top }: ZoomViewerProps) {
  return <Container url={src} left={left} top={top}></Container>;
}
