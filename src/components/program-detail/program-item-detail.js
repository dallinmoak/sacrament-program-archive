"use client";

import CSSModules from "react-css-modules";
import styles from "./program-detail.module.css";

import { useEffect, useState } from "react";
import Heading from "./heading";
import Main from "./main/main";
import Link from "next/link";

export default CSSModules(
  function ProgramItemDetail(props) {
    const [loading, setLoading] = useState(true);
    const [programDetails, setProgramDetails] = useState();
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
    let inner;

    if (loading) {
      inner = "loading...";
    } else {
      inner = (
        <div>
          <Heading programDetails={programDetails} />
          <Main programDetails={programDetails} />
          {/* {JSON.stringify(programDetails)} */}
        </div>
      );
    }

    return (
      <>
        <div styleName={`wrapper ${loading ? "loading" : ""}`}>{inner}</div>
        <div styleName="home-button">
          <Link href="/">
            <button>see all programs</button>
          </Link>
        </div>
      </>
    );
  },
  styles,
  { allowMultiple: true }
);
