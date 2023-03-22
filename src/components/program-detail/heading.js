import CSSModules from "react-css-modules";
import styles from "./heading.module.css";
import formatDate from "@/common/format-date";

export default CSSModules(function Heading(props) {
  const { date, bishop, firstCouselor, secondCouselor, chorister, organist} = { ...props.programDetails };
  const formattedDate = formatDate(date, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const table = (data) => {
    return (
      <div styleName="table">
        <h3 styleName="heading">{data.title}</h3>
        {Object.keys(data.items).map(key =>{
          return (
          <div key={key} styleName="table-row">
            <div>{key}</div>
            <span styleName="spacer"><span /></span>
            <div>{data.items[key]}</div>
          </div>
          )
        })}
      </div>
    );
  };
  return (
    <div>
      <h1 styleName="heading">
        Welcome to the El Paso 5th Ward of the Church of Jesus Christ of Latter-Day Saints
      </h1>
      <h1 styleName="heading">{formattedDate}</h1>
      <div styleName="tables">
        {table({title: "Bishopric", items: {Bishop: bishop, "1st Counselor": firstCouselor, "2nd Counselor": secondCouselor}})}
        {table({title: "Music", items: {Chorister: chorister, Organist: organist}})}
      </div>
    </div>
  );
}, styles);
