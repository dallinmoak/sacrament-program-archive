import initiate from "../../common/parse-initialize";
import hymnLookup from "./hymn-lookup";
import programItems from "./program-items";

export async function GET(request) {
  const myParse = initiate();
  const query = new myParse.Query("Program");
  try {
    const results = await query.find();
    // console.log(results);
    const programPromises = results.map(async (result) => {
      const items = await programItems(result.id);
      const openingHymnNumber = result.get("openingHymnNumber");
      const openingHymn = await hymnLookup(openingHymnNumber);
      const sacramentHymnNumber = result.get("sacramentHymn");
      const sacramentHymn = await hymnLookup(sacramentHymnNumber);
      const closingHymnNumber = result.get("closingHymn");
      const closingHymn = await hymnLookup(closingHymnNumber);
      console.log(result.id);
      let programObj = {
        date: result.get("date"),
        bishop: result.get("bishop"),
        firstCouselor: result.get("fistCounselor"),
        secondCouselor: result.get("secondCounselor"),
        chorister: result.get("chorister"),
        organist: result.get("organist"),
        presiding: result.get("presiding"),
        conducting: result.get("conducting"),        openingHymn: openingHymn,
        openingPrayer: result.get("openingPrayer"),
        sacramentHymn: sacramentHymn,
        closingHymn: closingHymn,
        closingPrayer: result.get("closingPrayer"),
        items: items,
      };
      return programObj;
    });
    const programs = await Promise.all(programPromises);
    return new Response(JSON.stringify(programs), { status: 200 });
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 404,
    });
  }
}
