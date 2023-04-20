import CSSModules from "react-css-modules";
import styles from "./new-program.module.css";
import { useEffect, useState } from "react";
import NewCustomItem from "./new-custom-item";

export default CSSModules(function AddItem(props) {
  const { setNewProgram, trigger, setTrigger } = { ...props.itemProps };
  const customItems = props.newProgram?.customItems
    ? props.newProgram.customItems
    : [];
  const newProgram = props.newProgram
  const [currentItem, setCurrentItem] = useState({});

  const handleRemove = id =>{
    setNewProgram(prevProgram=>{
      const targetIndex = prevProgram.customItems.findIndex(item =>{
        return item.id === id;
      })
      const newCustomItems = prevProgram.customItems.toSpliced(targetIndex, 1);
      return{
        ...prevProgram,
        customItems: newCustomItems,
      }
    })
  }

  const handleAddItem = () =>{
    setNewProgram((prevProgram) => {
      const newItem = { id: new Date().valueOf() };
      let customItems;
      if (prevProgram.customItems) {
        customItems = [...prevProgram.customItems, newItem];
      } else {
        customItems = [newItem];
      }
      return {
        ...newProgram,
        customItems: customItems,
      };
    });
  }


  useEffect(() => {
    if(trigger == "clear"){
      setNewProgram(prevProgram=>{
        return{
          ...newProgram,
          customItems: []
        }
      })
    }
  }, [trigger]);

  useEffect(()=>{
    setNewProgram(prevProgram =>{
      if(prevProgram.customItems) {
        const prevItems = prevProgram.customItems;
        const indexCurrent = prevItems.findIndex(item =>{
          return item.id === currentItem.id;
        })
        if (indexCurrent == -1) {
          return {
            ...prevProgram,
            customItems: [ ...prevItems, currentItem],
          }
        } else {
          return {
            ...prevProgram,
            customItems: prevItems.toSpliced(indexCurrent, 1, currentItem)
          }
        }
      } else {
        return {
          ...prevProgram,
          customItems: [currentItem]
        }
      }
    })
  },[currentItem])
  return (
    <div styleName="add-button">
      <button onClick={handleAddItem}>Add Item...</button>
      {customItems.map((item) => {
        const id = item.id.valueOf();
        return (
        <div key={id}>
          <NewCustomItem 
          id={id}
          handleRemove={handleRemove}
          setCurrentItem={setCurrentItem}
        />
        </div>);
      })}
    </div>
  );
}, styles);
