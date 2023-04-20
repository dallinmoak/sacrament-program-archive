import CSSModules from "react-css-modules";
import styles from "./heading.module.css";
import formatDate from "@/common/format-date";

import ProgramField from "../new-program/field";

export default CSSModules(function Heading(props) {
  const { date, bishop, firstCouselor, secondCouselor, chorister, organist } = {
    ...props.programDetails,
  };
  const edit = !!props.edit;
  const { headerFields, defaults, setNewProgram, trigger, setTrigger } = {
    ...props.editData,
  };
  const formattedDate = formatDate(date, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const table = (data) => {
    return (
      <div styleName="table">
        <h3 styleName="heading">{data.title}</h3>
        {data.items.map((item) => {
          return (
            <div key={item.value} styleName="table-row">
              <div>{item.display}</div>
              <span styleName="spacer">
                <span />
              </span>
              {edit ?
               <ProgramField data={{
                ...headerFields[item.prop],
                defaultValue: defaults ? defaults[item.prop] : "",
                setNewProgram,
                trigger,
                setTrigger,
               }} label={false}/> : 
               <div>{item.value}</div>}
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div styleName="heading-wrapper">
      <h1 styleName="heading">
        Welcome to the El Paso 5th Ward of the Church of Jesus Christ of
        Latter-Day Saints
      </h1>
      {edit ? (
        <ProgramField
          data={{
            ...headerFields.date,
            defaultValue: defaults ? defaults.date : "",
            setNewProgram,
            trigger,
            setTrigger,
          }}
        label={"Date"}/>
      ) : (
        <h1 styleName="heading">{formattedDate}</h1>
      )}
      <div styleName="tables">
        {table({
          title: "Bishopric",
          items: [
            {value: bishop, prop: "bishop", display: "Bishop"},
            {value: firstCouselor, prop: "firstCouselor", display: "1st Counselor"},
            {value: secondCouselor, prop: "secondCouselor", display: "2nd Counselor"}
          ],
        })}
        {table({
          title: "Music",
          items: [
            {value: chorister, prop: "chorister", display: "Chorister"},
            {value: organist, prop: "organist", display: "Organist"},
          ]
        })}
      </div>
    </div>
  );
}, styles);
