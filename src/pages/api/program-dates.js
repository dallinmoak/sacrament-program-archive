import initiate from "@/common/parse-initialize";

export default async function handler(req,res){
  const myParse = initiate();
  const query = new myParse.Query("Program").descending("date");
  try{
    const results = await query.find();
    const programs = results.map(result =>{
      return {
        id: result.id,
        date: result.get("date"),
      }
    })
    res.status(200).json(programs);
  }
  catch(e){
    console.log(e);
    res.status(400).json({error: e.message});
  }
}