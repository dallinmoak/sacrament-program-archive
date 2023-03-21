"use client";

import {useEffect, useState } from 'react';

export default function ProgramItemDetail(props) {
  const [loading, setLoading] = useState(true);
  const  [programDetails, setProgramDetails ] = useState();
  const getProgram = async (id) => {
    setLoading(true);
    const requestURI = `/api/program?${new URLSearchParams({
      id: id,
    })}`;
    const request = new Request(requestURI);
    fetch(request)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setProgramDetails(result);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  };
  useEffect(() => {
    getProgram(props.id);
  }, []);
  if (loading) {
    return "loading...";
  } else {
    return <>
    <p>details: </p>
    <div>{JSON.stringify(programDetails)}</div>
    </>
  }
}
