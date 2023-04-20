import AdminNav from "@/components/admin-nav";
import Layout from "@/components/layout";
import NewProgram from "@/components/new-program/new-program";
import Link from "next/link";

export default function Main(){
  return(
    <Layout>
      <AdminNav />
      <Link href="/admin/new">new program</Link>
    </Layout>
  )
}