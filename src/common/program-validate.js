export default function isValid(program) {
  if (!program.date) return false;
  if (!program.presiding) return false;
  if(!program.conducting) return false;
  if (program.openingHymn < 1) return false;
  if (!program.openingPrayer) return false;
  if (program.sacramentHymn < 1) return false;
  if (program.customItems){
    let hasError = false;
    program.customItems.map(item =>{
      if (!item.type) hasError = true;
      if(!item.presenting) hasError = true;
    })
    if(hasError) return false;
  }
  if (program.closingHymn < 1) return false;
  if (!program.closingPrayer) return false;
  return true;
}