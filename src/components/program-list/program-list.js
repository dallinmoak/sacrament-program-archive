"use client";

import { useEffect, useState } from "react";

export default function ProgramList() {
  const [loading, setLoading] = useState(true);
  const [programs, setPrograms] = useState();
  const getprograms = async () => {
    setLoading(true);
    fetch("/api/programs")
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
  if (loading) {
    return "loading...";
  } else {
    return (
      <div>
        <button onClick={getprograms}>refresh programs</button>
        <div>{JSON.stringify(programs)}</div>
      </div>
    );
  }
}
