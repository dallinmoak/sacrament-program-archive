import initiate from "@/common/parse-initialize";
import hymnLookup from "./hymn-lookup";
import programItems from "./program-items";

export async function GET(request) {
  const id = request.nextUrl.searchParams.get("id")
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
      return new Response(JSON.stringify(program));
    }
    catch(e){
      return new Response(JSON.stringify({error: "lookup error"}, {status: 500}))
    }
  }
  else return new Response(JSON.stringify({error: "no id"}), {status: 400})
}