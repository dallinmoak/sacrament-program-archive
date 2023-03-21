const formatDate = (date, options) => {
  const year = date.substring(0,4);
  const month = date.substring(4, 6);
  const day = date.substring(6,8);
  const dateObj = new Date(year,month -1,day);
  return dateObj.toLocaleDateString(undefined,options);
}

export default formatDate;