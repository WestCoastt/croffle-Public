"use client";
import { useParams, useSearchParams } from "next/navigation";
import styled from "@emotion/styled";
import { cat } from "@/app/category";
import { useEffect, useState } from "react";

// const Container = styled.div`
//   display: flex;
//   align-items: center;
//   height: 50px;
//   background-color: #fafafa;
//   border: 1px solid #eeeeee;

//   div {
//     display: flex;
//     align-items: center;
//     width: 1200px;
//     margin: auto;
//   }

//   .category {
//     color: #555555;
//   }

//   .arrow {
//     display: inline-block;
//     width: 20px;
//     height: 20px;
//     background: url("/assets/img/search_header_arrow.svg") no-repeat center;
//   }
// `;

const Container = styled.div`
  text-align: center;
  font-size: 24px;
  padding-bottom: 14px;
  h2 {
    font-weight: 500;
  }
`;

export default function SearchHeader() {
  const categories = useParams();
  const depth1 = cat.find(
    (el) => el.id.toString() === categories.id.slice(0, 3)
  );
  const depth2 =
    categories.id.length >= 6 &&
    depth1?.child.find((el) => el.id.toString() === categories.id.slice(3, 6));
  const depth3 =
    categories.id.length === 8 &&
    depth2 &&
    depth2?.child.find((el) => el.id.toString() === categories.id.slice(6, 8));

  // console.log(depth1, depth2, depth3);

  return (
    // <Container>
    //   <div>
    //     <span className="category">전체</span>
    //     <span className="arrow" />
    //     <span>&apos;{keyword}&apos;</span>
    //   </div>
    // </Container>
    <Container>
      <h2>
        {depth3 ? depth3.name : depth2 !== false ? depth2?.name : depth1?.name}
      </h2>
    </Container>
  );
}
