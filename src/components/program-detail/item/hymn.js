import CSSModules from "react-css-modules";
import styles from "./item.module.css";
import { useEffect, useState } from "react";

export default CSSModules(function HymnItem(props) {

  const { label, presentor, fastSunday } = {
    ...props.content,
  };
  let current = props.number? props.number : presentor;
  let FS = props.currentFastSunday ? props.currentFastSunday : false;

  const [loading, setLoading] = useState(true);
  const [hymnTitle, setHymnTitle ] = useState("...");
  const [hymnLink, setHymnLink] = useState("...");
  const getHymn = async (id) =>{
    setLoading(true);
    const requestURI =`/api/hymn?${new URLSearchParams({
      id: id,
    })}`;
    const request = new Request(requestURI);
    fetch(request)
      .then(res=> res.json())
      .then(result => {
        setHymnTitle(result.hymnTitle);
        setHymnLink(result.hymnLink);
        setLoading(false);
      })
      .catch(e=> {
        setLoading(false);
        console.log(e);
      });
  };

  useEffect(()=>{
    getHymn(current);
  },[current])

  const hymnLine = (
    <div styleName="hymn">
      &ldquo;
      <a href={hymnLink} target="_blank">
        {hymnTitle}
      </a>
      &rdquo;
    </div>
  );
  return (
    <>
      {hymnLine}
      {label == "Sacrament Hymn" ? (
        <>
          <div styleName="sacr">Administration of the Sacrament</div>
          {(fastSunday || props.currentFastSunday) ? (
            <div styleName="sacr">Bearing of Testimony by the Congregation</div>
          ) : null}
        </>
      ) : null}
    </>
  );
}, styles);
