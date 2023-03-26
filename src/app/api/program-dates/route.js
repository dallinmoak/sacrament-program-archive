import initiate from "@/common/parse-initialize";

//this is needed so that a cached version of the list is not used. 
export const revalidate = 0;

export async function GET(request) {
  const myParse = initiate();
  const query= new myParse.Query("Program");
  try {
    const results = await query.find();
    const programs = results.map(result =>{
      return {
        id: result.id,
        date: result.get("date"),
      }
    })
    return new Response(JSON.stringify(programs), { status: 200 });
  }
  catch(e) {
    console.log(e);
    return new Response(JSON.stringify({ error: error.message }), { status: 400} );
  }
}