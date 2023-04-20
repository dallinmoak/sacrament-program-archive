export default function handler(req,res) {
  const defaults = {
    date: "2023-04-09",
    bishop: "Robert Whetten",
    firstCouselor: "Enrique Darancou",
    secondCouselor: "Jason Call",
    chorister: "Kirsten Arroyo",
    organist: "Bethany Tredway",
    presiding: "Robert Whetten",
    conducting: "Robert Whetten",
    openingHymn: "",
  }
  res.status(200).json(defaults);
}