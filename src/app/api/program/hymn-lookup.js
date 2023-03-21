import initiate from "@/common/parse-initialize";

export default async function hymnLookup(hymnNumber) {
  const myParse = initiate();
  const query = new myParse.Query("hymn").equalTo("number",hymnNumber);
  try{
    const results = await query.find();
    const hymn = results.map (result => {
      return {
        number: result.get("number"),
        title: result.get("title"),
        link: result.get("link"),
      }
    })[0]
    return hymn; 
  }
  catch(e){
    console.log(e);
    return {error: "something went wrong"};
  }
}