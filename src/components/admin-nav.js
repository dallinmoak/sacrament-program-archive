import Link from "next/link";

export default function AdminNav(){
  return(
    <div>
      <Link href="/">See all programs</Link>
      <Link href="/admin/main">main admin page</Link>
    </div>
  )
}