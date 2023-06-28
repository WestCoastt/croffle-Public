"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SortLink(props: { item: string; sorted_type: number }) {
  const pathname = usePathname();
  const params = useSearchParams();
  const [href, setHref] = useState("");

  useEffect(() => {
    const URLSearch = new URLSearchParams(location.search);
    URLSearch.set("sorted_type", String(props.sorted_type));
    const path = pathname + "?" + URLSearch.toString();
    setHref(path);
  }, [params]);

  return (
    <Link href={href}>
      <span>
        <img src="/assets/img/check_mark.svg" alt="check_mark" />
        <span>{props.item}</span>
      </span>
    </Link>
  );
}
