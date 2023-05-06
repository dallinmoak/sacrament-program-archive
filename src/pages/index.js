import isAdmin from "@/common/admin-check";
import AdminNav from "@/components/admin-nav";
import Layout from "@/components/layout";
import ProgramList from "@/components/program-list/program-list";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";

import { authOptions } from "./api/auth/[...nextauth]";

export default function Home({ serverIsAdmin }){
  const router = useRouter();
  let adminNav = "";
  if(serverIsAdmin){
    adminNav = <AdminNav />;
  }
  return(
    <Layout>
      {adminNav}
      {router.query.msg? 
      <div >{router.query.msg}<button onClick={()=> router.push("/")}>dismiss</button></div>:
      null}
      <ProgramList />
    </Layout>
  )
}

export async function getServerSideProps(context){
  const session = await getServerSession(context.req, context.res, authOptions)
  const serverIsAdmin = isAdmin(session?.user?.email);
  return  { props: {serverIsAdmin: serverIsAdmin}};
}