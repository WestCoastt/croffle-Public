"use client";
import styled from "@emotion/styled";

const Container = styled.div<{ url: string }>`
  position: absolute;
  left: 750px;
  z-index: 11;

  width: 500px;
  height: 500px;
  // background-color: #393675;
  background: url(${(props) => props.url}) no-repeat;
  background-position: left -100px top -100px;
  background-size: 200%;
`;

export default function ZoomViewer(props: { src: string }) {
  return <Container url={props.src}>ZoomViewer</Container>;
}
