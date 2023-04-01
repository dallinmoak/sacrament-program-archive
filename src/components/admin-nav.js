import Link from "next/link";
import { useRouter } from "next/router";

export default function AdminNav(){
  const router = useRouter();
  const linkList = [
    {path: "/", title: "Home"},
    {path: "/admin/main", title: "Admin Page"},
  ]
  return(
    <div>
      {linkList.map(link =>{
        if(link.path != router.asPath){
          return <Link key={link.path} href={link.path}>{link.title}</Link>
        }
      })}
    </div>
  )
}