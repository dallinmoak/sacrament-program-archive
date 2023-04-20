export default function getInputStyle(type, field) {
  return{
    width: type == "number" ? "5em" : type=="checkbox" ? "auto" : "10em",
    fontSize: field == "date" ? "1.8em" : ".8em",
  }
}