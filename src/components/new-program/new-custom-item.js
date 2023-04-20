import CSSModules from "react-css-modules";
import styles from "../program-detail/item/item.module.css";
import getInputStyle from "@/common/input-style";
import { useState } from "react";

export default CSSModules(function NewCustomItem(props) {
  const [ type, setType ] = useState("");
  const [ presentor, setPresentor ] = useState("");
  const id = props.id;
  const handleRemove = props.handleRemove;
  const setCurrentItem = props.setCurrentItem;
  const inputStyle = getInputStyle("text", "custom");

  const handleChangeType = e =>{
    setType(e.target.value);
    setCurrentItem({
      id: id,
      type: e.target.value,
      presentor: presentor,
    })
  }
  const handleChangePresentor = e =>{
    setPresentor(e.target.value);
    setCurrentItem({
      id: id,
      type: type,
      presentor: e.target.value,
    })
  }
  return (
    <div styleName="item-wrapper">
      <div styleName="item" style={{ backgroundImage: "url('/dash.png')" }}>
        <div styleName="label">
          <input value={type} onChange={handleChangeType} style={inputStyle} type="text" /></div>
        <div styleName="pres">
          <input value={presentor} onChange={handleChangePresentor} style={inputStyle} type="text" />
          <button onClick={() => handleRemove(id)}>remove</button>
        </div>
      </div>
    </div>
  );
}, styles);
