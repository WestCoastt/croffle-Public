"use client";
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";

const NavBar = styled.div`
  display: flex;
  align-items: center;
  height: 134px;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  margin: auto;
  // background-color: #ebe9e9;

  .menu {
    width: 42px;
    cursor: pointer;
  }
`;

const SelectBox = styled.div`
  display: flex;
  align-items: center;
  width: 80px;
  height: 48px;
  font-size: 15px;
  margin-left: 62px;
  border-bottom: 1px solid #000;
  cursor: pointer;

  select {
    width: 68px;
    border: 0;
    appearance: none;
    outline: none;
    cursor: pointer;
  }
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  width: 400px;
  height: 48px;
  margin: 14px;
  border-bottom: 1px solid #000;

  input {
    width: 360px;
    border: 0;
    outline: none;
  }
  img {
    width: 30px;
    margin: auto;
  }
`;
// const Box = styled.div`
//   // height: 100%;
// `;

export default function Nav() {
  return (
    <NavBar>
      <Container>
        <img className="menu" src="/img/hamburger.svg" alt="menu" />
        <img style={{ marginLeft: "52px" }} src="/img/logo.svg" alt="logo" />
        <SelectBox>
          <select name="category">
            <option value="whole">전체</option>
          </select>
          <img src="/img/arrow_drop_down.svg" alt="category-select" />
        </SelectBox>

        <SearchBox>
          <input type="text" placeholder="상품을 검색해보세요!" />
          <img style={{ cursor: "pointer" }} src="/img/lens.svg" alt="search" />
        </SearchBox>
        {/* <Box>
          <select name="category">
            <option value="whole">전체</option>
          </select>
        </Box> */}
      </Container>
    </NavBar>
  );
}
