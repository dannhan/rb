"use client";
import * as React from "react";

export function ListData({ data: original }: any) {
  const [data, setData] = React.useState(original);

  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
