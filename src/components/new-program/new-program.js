import { useEffect, useState } from "react";
import Heading from "../program-detail/heading";
import Item from "../program-detail/item/item";

import CSSModules from "react-css-modules";
import styles from "./new-program.module.css";
import ProgramField from "./field";
import AddItem from "./add-item";

import isValid from "@/common/program-validate";

export default CSSModules(function NewProgram() {
  const [newProgram, setNewProgram] = useState();
  const [loading, setLoading] = useState();
  const [message, setMessage] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const [trigger, setTrigger] = useState();
  const [error, setError] = useState();
  const [defaults, setDefaults] = useState();

  const postNewProgram = async (data) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch("/api/new-program", options);
    return response.json();
  };

  const getDefaults = async () => {
    const response = await fetch("/api/new-program/defaults");
    const data = await response.json();
    setDefaults(data);
  };

  const save = async () => {
    setNewProgram((prevProgram) => {
      ({ ...prevProgram, date: prevProgram.date.replaceAll("-", "") });
    });
    if (isValid(newProgram)) {
      setShowMessage(true);
      setLoading(true);
      postNewProgram(newProgram).then((data) => {
        setLoading(false);
        setMessage(data.message);
        setNewProgram();
        setTrigger("clear");
      });
    } else {
      setError("program isn't valid");
    }
  };

  const itemProps = {
    setNewProgram: setNewProgram,
    trigger: trigger,
    setTrigger: setTrigger,
  };

  const hmynContentProps = {
    presentor: 0,
    hymnTitle: " ",
    hymnLink: "#",
    isHymn: true,
  };

  const headerFields = {
    date: { field: "date", inputType: "date" },
    bishop: { field: "bishop", inputType: "text" },
    firstCouselor: { field: "firstCouselor", inputType: "text" },
    secondCouselor: { field: "secondCouselor", inputType: "text" },
    chorister: { field: "chorister", inputType: "text" },
    organist: { field: "organist", inputType: "text" },
  };

  const itemTemplate = (props) => {
    return (
      <Item content={props.content} edit={true} editData={props.editData} />
    );
  };

  useEffect(() => {
    getDefaults();
    setNewProgram(defaults);
  }, []);

  return (
    <div>
      <h1>New Program</h1>
      <p>Enter the new program information here, and press save when done.</p>
      <div styleName="preview">
        <Heading
          programDetails={{ date: "00000000" }}
          edit={true}
          editData={{
            headerFields,
            defaults,
            ...itemProps,
          }}
        />
        {itemTemplate({
          content: { label: "Presiding", presentor: defaults?.presiding },
          editData: { field: "presiding", inputType: "text", ...itemProps },
        })}
        {itemTemplate({
          content: { label: "Conducting", presentor: defaults?.conducting },
          editData: { field: "conducting", inputType: "text", ...itemProps },
        })}
        {itemTemplate({
          content: { label: "Opening Hymn", ...hmynContentProps },
          editData: {
            currentVal: newProgram ? newProgram.openingHymn : undefined,
            field: "openingHymn",
            inputType: "number",
            ...itemProps,
          },
        })}
        {itemTemplate({
          content: { label: "Opening Prayer" },
          editData: { field: "openingPrayer", inputType: "text", ...itemProps },
        })}
        {itemTemplate({
          content: { label: "Sacrament Hymn", ...hmynContentProps },
          editData: {
            currentFastSunday: newProgram ? newProgram.fastSunday : false,
            currentVal: newProgram ? newProgram.sacramentHymn : undefined,
            field: "sacramentHymn",
            inputType: "number",
            ...itemProps,
          },
        })}
        <div styleName="fast-sunday">
          <ProgramField
            label={"Fast Sunday"}
            data={{
              defaultValue: false,
              field: "fastSunday",
              inputType: "checkbox",
              ...itemProps,
            }}
          />
        </div>
        <AddItem itemProps={itemProps} newProgram={newProgram} />
        {itemTemplate({
          content: { label: "Closing Hymn", ...hmynContentProps },
          editData: {
            currentVal: newProgram ? newProgram.closingHymn : undefined,
            field: "closingHymn",
            inputType: "number",
            ...itemProps,
          },
        })}
        {itemTemplate({
          content: { label: "Closing Prayer" },
          editData: { field: "closingPrayer", inputType: "text", ...itemProps },
        })}
      </div>
      <button onClick={save}>save</button>
      <div>{error ? <>{`error: ${error}`}<button onClick={() => setError()}>dismiss</button></> : null}</div>
      <div>
        {showMessage ? (
          loading ? (
            "loading..."
          ) : (
            <>
              {message}
              <button
                onClick={() => {
                  setShowMessage(false);
                  setMessage();
                }}
              >
                dismiss
              </button>
            </>
          )
        ) : null}
      </div>
      <code>program: {JSON.stringify(newProgram)}</code>
      <br />
    </div>
  );
}, styles);
