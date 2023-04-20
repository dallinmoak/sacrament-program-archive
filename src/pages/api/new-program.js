import isAdmin from "@/common/admin-check";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req,res) {
  const session = await getServerSession(req,res,authOptions);
  console.log("request body: ", req.body);
  const delay = ms => new Promise(resolve=> setTimeout(resolve, ms));

  await delay(750);
  
  if(isAdmin(session?.user.email)){
    res.status(200).json({message: "new program saved!"});
  }
  else {
    res.status(403).json({message: "unauthorized"});
  }
}