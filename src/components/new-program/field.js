import { useEffect, useState } from "react";
import getInputStyle from "@/common/input-style";

export default function ProgramField(props) {
  const { field, inputType, defaultValue, setNewProgram, trigger, setTrigger } = { ...props.data };
  const [value, setValue] = useState(defaultValue);
  const handleFieldChange = (e) => {
    let val;
    if (e.target.type == "checkbox") {
      val = !value;
    } else {
      val = e.target.value;
    }
    setValue(val);
    setNewProgram((prevProgram) => ({
      ...prevProgram,
      [field]: (field == "date" ? val.replaceAll("-","") : val),
    }));
  };
  const inputStyle = getInputStyle(inputType, field);
  useEffect(()=>{
    if(trigger== 'clear'){
      setValue("");
      setTrigger("");
    }
    setValue(defaultValue);
    setNewProgram((prevProgram) => ({
      ...prevProgram,
      [field]: (field == "date" ? defaultValue.replaceAll("-","") : defaultValue),
    }));
  },[trigger, defaultValue])
  return (
    <div>
      {props.label ? `${props.label}: `: null}
      <input checked={!!value} style={inputStyle} value={value} type={inputType} onChange={handleFieldChange} />
    </div>
  );
}
