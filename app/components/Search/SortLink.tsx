"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SortLink(props: { name: string; sort_type: string }) {
  const pathname = usePathname();
  const params = useSearchParams();
  const [href, setHref] = useState("");

  useEffect(() => {
    const URLSearch = new URLSearchParams(location.search);
    URLSearch.set("sort_type", String(props.sort_type));
    const path = pathname + "?" + URLSearch.toString();
    setHref(path);
  }, [params]);

  return (
    <Link href={href}>
      <span>
        <img src="/assets/img/check_mark.svg" alt="check_mark" />
        <span>{props.name}</span>
      </span>
    </Link>
  );
}
