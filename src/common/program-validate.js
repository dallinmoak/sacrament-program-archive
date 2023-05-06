export default function isValid(program) {
  let errorMsg = "";
  console.log(program.openingHymn);
  if (!program?.date) errorMsg = "no program date provided.";
  else if (!program.presiding) errorMsg = "bad Presiding";
  else if(!program.conducting) errorMsg = "bad Conducting";
  else if  (!program.openingHymn) errorMsg = "no Opening Hymn";
  else if (program.openingHymn < 1)  errorMsg = "bad Opening Hymn";
  else if (!program.openingPrayer) errorMsg = "bad Opening Prayer";
  else if  (!program.sacramentHymn) errorMsg = "no Sacrament Hymn";
  else if (program.sacramentHymn < 1) errorMsg = "bad Sacrament Hymn";
  else if (program.customItems){
    let hasError = false;
    program.customItems.map(item =>{
      if (!item.type) hasError = true;
      if(!item.presentor) hasError = true;
    })
    if(hasError) errorMsg = "bad custom items";
  }
  else if (!program.closingHymn) errorMsg = "no closing Hymn";
  else if (program.closingHymn < 1) errorMsg = "bad Closing Hymn";
  else if (!program.closingPrayer) errorMsg = "bad Closing Prayer";
  
  if(errorMsg) {
    return {
      valid: false,
      error: errorMsg,
    }
  } else {
    return {
      valid: true,
      error: "",
    }
  }
}