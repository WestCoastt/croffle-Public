"use client";
import { CookiesProvider, useCookies } from "react-cookie";
import styled from "@emotion/styled";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { maskingAtom } from "./DetailContents";
import { selectedAtom } from "./TopContents";
import axios from "axios";
import { useParams } from "next/navigation";
import Pagination from "../Pagination";

const Container = styled.div`
  width: 1200px;
  margin: auto;
  padding: 100px 0 50px;

  h1 {
    margin: 0;
    font-size: 24px;
    font-weight: 500;
    letter-spacing: -1.2px;
  }
`;

const QnAHeader = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  padding: 20px 0 16px;
  border-bottom: 1px solid #000;
`;

const QnABtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 140px;
  padding: 14px 12px 14px 18px;
  font-size: 14px;
  border: 1px solid #000;
  border-radius: 5px;
  background: #fff;
  cursor: pointer;

  img {
    transform: rotate(270deg);
  }
`;

const TabContainer = styled.ul`
  display: flex;
  justify-content: space-between;
  width: fit-content;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    font-size: 16px;
    letter-spacing: -0.8px;
    color: #888888;
    position: relative;

    white-space: nowrap;
    padding: 0 14px;
    cursor: pointer;
  }
  li:first-of-type {
    padding-left: 0;
  }
  .focus {
    color: #000;
    font-weight: 500;
  }

  li:not(:last-of-type) {
    &::after {
      content: "";
      position: absolute;
      top: 3px;
      right: 0;
      width: 1px;
      height: 18px;
      background: #eeeeee;
    }
  }
`;

const CardContainer = styled.div`
  margin-bottom: 40px;
`;

const QnACard = styled.div`
  padding: 24px;
  border-bottom: 1px solid #e5e5e5;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;

  .wrapper {
    display: flex;
  }
  .state {
    width: 84px;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: -0.8px;
  }
  .no_answer {
    color: #5f5f5f;
  }
  .title {
    display: flex;
    align-items: center;
    width: 880px;
    height: 23px;
    font-size: 15px;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    img {
      display: none;
    }

    &:hover {
      text-decoration: underline;
    }
  }
  .secret {
    color: #999;

    img {
      display: inline;
      margin: 0 8px;
      width: 14px;
    }
  }
`;

const Info = styled.div`
  span {
    width: 90px;
    padding: 0 12px;
    height: 18px;
    color: #777;
    font-size: 14px;
    text-align: center;
  }
  span:not(:first-of-type) {
    border-left: 1px solid #eeeeee;
  }
`;

const Contents = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;

  .container {
    width: 1068px;
  }
  .contents {
    width: 880px;
    padding: 20px 0;
  }
  .answer_wrapper {
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
    border-top: 1px solid #e5e5e5;
  }
  .answer {
    width: 880px;
  }
`;

interface QnaItem {
  sq: number;
  state: string;
  title: string;
  content: string;
  question_dttm: string;
  answer: string;
  answer_dttm: string;
  is_secret: boolean;
  account: { email: string };
}

export const qnaAtom = atom(0);
export default function QnAContents() {
  const sq = useParams().id;
  const qnaRef = useRef<HTMLDivElement>(null);
  const setqnaTop = useSetAtom(qnaAtom);
  const masking = useAtomValue(maskingAtom);
  const selArr = useAtomValue(selectedAtom);
  const [focus, setFocus] = useState("total");
  const [qnas, setQnas] = useState<QnaItem[]>([]);
  const [display, setDisplay] = useState(0);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [cookies, setCookie, removeCookie] = useCookies(["sck"]);

  useEffect(() => {
    qnaRef.current && setqnaTop(qnaRef.current?.offsetTop - 120);
  }, [qnaRef, masking, selArr]);

  const handleDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toISOString().split("T")[0].replaceAll("-", ".");
  };

  const handleDisplay = (item: QnaItem) => {
    if (item.title === "작성자만 볼 수 있습니다") return;
    display === item.sq ? setDisplay(0) : setDisplay(item.sq);
  };

  const getQna = async () => {
    const tk = localStorage.getItem("tk");
    const res = await axios.get(
      `/v1/products/${sq}/qnas?sort_type=STAR&page=${page}&size=10`,
      {
        headers: {
          Authorization: `Bearer ${cookies.sck ? cookies.sck : tk ? tk : ""}`,
        },
      }
    );

    setQnas(res.data.data.list);
    setTotal(res.data.data.total_count);
  };

  useEffect(() => {
    getQna();
  }, [page]);

  return (
    <CookiesProvider>
      <Container ref={qnaRef}>
        <h1>상품Q&A</h1>
        <QnAHeader>
          <TabContainer>
            <li
              className={focus === "total" ? "focus" : ""}
              onClick={() => setFocus("total")}
            >
              전체(59)
            </li>
            <li
              className={focus === "completed" ? "focus" : ""}
              onClick={() => setFocus("completed")}
            >
              답변완료(59)
            </li>
            <li
              className={focus === "wating" ? "focus" : ""}
              onClick={() => setFocus("wating")}
            >
              답변대기(0)
            </li>
          </TabContainer>
          <QnABtn>
            문의하기
            <img src="/assets/img/option_arrow.svg" alt="qna_arrow" />
          </QnABtn>
        </QnAHeader>
        <CardContainer>
          {qnas.map((item) => (
            <QnACard key={item.sq}>
              <CardHeader>
                <div className="wrapper">
                  <div
                    className={`state ${
                      item.state !== "ANSWER" ? "no_answer" : ""
                    }`}
                  >
                    {item.state === "ANSWER" ? "답변완료" : "답변대기"}
                  </div>
                  <div
                    className={`title ${
                      item.title === "작성자만 볼 수 있습니다" ? "secret" : ""
                    }`}
                    onClick={() => handleDisplay(item)}
                  >
                    <span>
                      {item.title !== "작성자만 볼 수 있습니다"
                        ? item.title
                        : "비밀글입니다."}
                    </span>

                    <img src="/assets/img/lock.svg" alt="secret" />
                  </div>
                </div>
                <Info>
                  <span>{item.account.email.slice(0, 4)}*****</span>
                  <span>{handleDate(item.question_dttm)}</span>
                </Info>
              </CardHeader>
              {display === item.sq && (
                <Contents>
                  <div className="container">
                    <div className="contents">{item.content}</div>
                    {item.answer && (
                      <div className="answer_wrapper">
                        <div className="answer">{item.answer}</div>
                        <Info>
                          <span>판매자</span>
                          <span>{handleDate(item.answer_dttm)}</span>
                        </Info>
                      </div>
                    )}
                  </div>
                </Contents>
              )}
            </QnACard>
          ))}
        </CardContainer>
        <Pagination
          total_page={Math.ceil(total / 10)}
          c_page={page}
          setPage={setPage}
        />
      </Container>
    </CookiesProvider>
  );
}
