import initiate from "@/app/common/parse-initialize";

export default async function programItems(programId) {
  const myParse = initiate();
  const query = new myParse.Query("ProgramItem").equalTo("programId",programId);
  try{
    const results = await query.find();
    const items = results.map( result => {
      return {
        programId: result.get("programId"),
        type: result.get("type"),
        presentor: result.get("presentor"),
        title: result.get("title"),
        position: result.get("position"),
      }
    })
    return items;
  }
  catch(e){
    console.log(e);
    return [ "something went wrong" ];
  }
} 