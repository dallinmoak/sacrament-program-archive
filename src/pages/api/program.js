import initiate from "@/common/parse-initialize";

import programItems from "@/api-helper/program-items";
import hymnLookup from "@/api-helper/hymn-lookup";

export default async function handler(req,res){
  const id = req.query.id;
  if(id){
    const myParse = initiate();
    const query = new myParse.Query("Program").equalTo("objectId", id);
    try{
      const results = await query.find();
      const result = results[0];
      const items = await programItems(result.id);
      const openingHymnNumber = result.get("openingHymn");
      const openingHymn = await hymnLookup(openingHymnNumber);
      const sacramentHymnNumber = result.get("sacramentHymn");
      const sacramentHymn = await hymnLookup(sacramentHymnNumber);
      const closingHymnNumber = result.get("closingHymn");
      const closingHymn = await hymnLookup(closingHymnNumber);
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