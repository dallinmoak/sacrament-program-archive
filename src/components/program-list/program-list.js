"use client";

import { useEffect, useState } from "react";
import ProgramItem from "./program-item";

export default function ProgramList() {
  const [loading, setLoading] = useState(true);
  const [programs, setPrograms] = useState();
  const getprograms = async () => {
    setLoading(true);
    fetch("/api/program-dates", { cache: "no-store" })
      .then((res) => res.json())
      .then((result) => {
        setPrograms(result);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };
  useEffect(() => {
    getprograms();
  }, []);

  let inner;
  if (loading) {
    inner = "loading...";
  } else {
    inner = programs.map((program) => {
      return (
        <ProgramItem key={program.id} id={program.id} date={program.date} />
      );
    });
  }

  return (
    <div>
      <button onClick={getprograms}>refresh programs</button>
      <h2>program list: </h2>
      {inner}
      {/* <div>{JSON.stringify(programs)}</div> */}
    </div>
  );
}
