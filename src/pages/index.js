import isAdmin from "@/common/admin-check";
import AdminNav from "@/components/admin-nav";
import Layout from "@/components/layout";
import ProgramList from "@/components/program-list/program-list";
import { getServerSession } from "next-auth";

import { authOptions } from "./api/auth/[...nextauth]";

export default function Home({ serverIsAdmin }){
  let adminNav = "";
  if(serverIsAdmin){
    adminNav = <AdminNav />;
  }
  return(
    <Layout>
      {adminNav}
      <ProgramList />
    </Layout>
  )
}

export async function getServerSideProps(context){
  const session = await getServerSession(context.req, context.res, authOptions)
  const serverIsAdmin = isAdmin(session?.user?.email);
  return  { props: {serverIsAdmin: serverIsAdmin}};
}