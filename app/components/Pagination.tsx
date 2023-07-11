"use client";
import styled from "@emotion/styled";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import path from "path";
import { use, useEffect, useState } from "react";

const Container = styled.div`
  display: flex;
  gap: 18px;
  width: fit-content;
  margin: auto;

  button {
    background: #fff;
    border: none;
    cursor: pointer;
  }
  .left {
    transform: rotate(90deg);
  }
  .right {
    transform: rotate(270deg);
  }
`;

const PageNumbers = styled.div`
  display: flex;
  gap: 6px;
  width: fit-content;
  margin: auto;

  button {
    width: 32px;
    height: 32px;
    line-height: 32px;
    padding: 0;
    color: #888888;
    font-size: 14px;
    font-weight: 500;
    background: #fff;
    border: none;
    cursor: pointer;
  }
  .focus {
    color: #fff;
    border-radius: 30px;
    background: #1d24dd;
  }
`;

interface PaginationProps {
  total_page: number;
}

export default function Pagination({ total_page }: PaginationProps) {
  const page = Number(useSearchParams().get("page"));
  const [current, setCurrent] = useState(1);

  const pathname = usePathname();

  const getHref = (i: number) => {
    const URLSearch = new URLSearchParams(location.search);
    URLSearch.set("page", String(i));
    return pathname + "?" + URLSearch.toString();
  };

  useEffect(() => {
    page === 0 ? setCurrent(1) : setCurrent(page);
  }, [page]);

  return (
    <Container>
      {/* <button>
        <img
          className="left"
          src="/assets/img/option_arrow.svg"
          alt="pagination_left"
        />
      </button> */}
      <PageNumbers>
        {pathname.split("/")[1] === "search" || "categories"
          ? [...Array(total_page)].map((item, i) => (
              <Link key={i + 1} href={getHref(i + 1)}>
                <button className={current === i + 1 ? "focus" : ""}>
                  {i + 1}
                </button>
              </Link>
            ))
          : [...Array(total_page)].map((item, i) => (
              <button
                className={current === i + 1 ? "focus" : ""}
                key={i + 1}
                onClick={() => setCurrent(i + 1)}
              >
                {i + 1}
              </button>
            ))}
        {/* {[...Array(total_page)].map((item, i) => (
        <Link key={i + 1} href={`/page?=${i + 1}`}>
          <button className={page === i + 1 ? "focus" : ""}>{i + 1}</button>
        </Link>
      ))} */}
      </PageNumbers>
      {total_page > 10 && (
        <button>
          <img
            className="right"
            src="/assets/img/option_arrow.svg"
            alt="pagination_left"
          />
        </button>
      )}
    </Container>
  );
}
