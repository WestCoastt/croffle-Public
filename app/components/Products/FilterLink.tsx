"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function FilterLink(props: {
  name: string;
  filter_name: string;
}) {
  const pathname = usePathname();
  const params = useSearchParams();
  const [href, setHref] = useState("");

  useEffect(() => {
    const URLSearch = new URLSearchParams(location.search);
    URLSearch.set("filter_name", props.filter_name);
    const path = pathname + "?" + URLSearch.toString();
    setHref(path);
  }, [params]);

  return (
    <Link href={href}>
      <span>{props.name}</span>
    </Link>
  );
}
