import { signOut } from "next-auth/react";

import { useRouter } from "next/router";


export default function UnathorizedAccount(){
  const router = useRouter();
  const handleSignOut = e =>{
    e.preventDefault();
    signOut({redirect: false});
    router.push("/")
  }
  return(
    <div>
      You are signed in, but your account isn't authorized as an admin. Try singing in to an admin account.
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  )
}