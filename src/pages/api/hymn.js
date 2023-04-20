import hymnLookup from "@/api-helper/hymn-lookup";

export default async function handler(req, res){
  const id = req.query.id;
  if(id){
    const hymn = await hymnLookup(id);
    if(hymn){
      res.status(200).json({
        hymnTitle: hymn.title,
        hymnLink: hymn.link,
      })
    } else{
      res.status(400).json({error: `id ${id} not found.`})
    }
  }
  else {
    res.status(400).json({error: "no id"});
  }
}