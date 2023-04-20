import CSSModules from "react-css-modules";
import styles from "./item.module.css";

import ProgramField from "../../new-program/field";
import HymnItem from "./hymn";

export default CSSModules(
  function Item(props) {
    const {
      label,
      presentor,
      hymnTitle,
      hymnLink,
      title,
      isHymn,
      fastSunday,
    } = {
      ...props.content,
    };
    const edit = props.edit;
    const {
      currentFastSunday,
      field,
      inputType,
      setNewProgram,
      trigger,
      setTrigger,
    } = { ...props.editData };

    return (
      <div styleName="item-wrapper">
        <div styleName="item" style={{ backgroundImage: "url('/dash.png')" }}>
          <div styleName="label">{label}</div>
          <span styleName="spacer">
            <span />
          </span>
          {title ? (
            <div styleName="pres">
              <div styleName="multi">
                <span styleName="title">{title}</span>
                <span styleName="multi-pres">&nbsp;({presentor})</span>
              </div>
            </div>
          ) : edit ? (
            <ProgramField
              data={{
                field: field,
                inputType: inputType,
                defaultValue: presentor,
                setNewProgram: setNewProgram,
                trigger: trigger,
                setTrigger: setTrigger,
              }}
            />
          ) : (
            <div styleName="pres">{presentor}</div>
          )}
        </div>
        {isHymn ? (
          <HymnItem
            content={props.content}
            number={props.editData?.currentVal}
            currentFastSunday={currentFastSunday}
          />
        ) : null}
      </div>
    );
  },
  styles,
  { allowMultiple: true }
);
