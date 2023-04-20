import initiate from "@/common/parse-initialize";

import programItems from "@/api-helper/program-items";

export default async function handler(req,res){
  const id = req.query.id;
  if(id){
    const myParse = initiate();
    const query = new myParse.Query("Program").equalTo("objectId", id);
    try{
      const results = await query.find();
      const result = results[0];
      const items = await programItems(result.id);
      const openingHymn = {
        number: result.get("openingHymn"),
      }
      const sacramentHymn = {
        number: result.get("sacramentHymn"),
      }
      const closingHymn = {
        number: result.get("closingHymn"),
      };
      const program = {
        id: result.id,
        date: result.get("date"),
        bishop: result.get("bishop"),
        firstCouselor: result.get("firstCounselor"),
        secondCouselor: result.get("secondCounselor"),
        chorister: result.get("chorister"),
        organist: result.get("organist"),
        presiding: result.get("presiding"),
        conducting: result.get("conducting"),
        openingHymn: openingHymn,
        openingPrayer: result.get("openingPrayer"),
        sacramentHymn: sacramentHymn,
        closingHymn: closingHymn,
        closingPrayer: result.get("closingPrayer"),
        items: items,
        fastSunday: result.get("fastSunday"),
      }
      res.status(200).json(program);
    }
    catch(e){
      console.log(e);
      res.status(500).json({error: "lookup error"});
    }
  }
  else {
    res.status(400).json({error: "no id"});
  }
}