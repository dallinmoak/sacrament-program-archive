import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]";

import isAdmin from "@/common/admin-check";

export default function SignIn({ providers }){
  let inner = "";
  if(providers.google.id){
    inner = <button onClick={()=> signIn(providers.google.id)}>sign in with google </button>
  }
  return(
    <>
      {inner}
    </>
  )
}
export async function getServerSideProps(context){
  const session = await getServerSession(context.req, context.res, authOptions);
  if(session){
    if (isAdmin(session.user.email)){
      return {redirect: {destination: "/admin/main"}};
    } return { redirect: { destination: "/unauthorized-account"}}
  }

  const providers = await getProviders();
  return{
    props: {providers: providers ?? {} },
  }
}