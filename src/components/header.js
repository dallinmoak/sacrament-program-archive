import { signIn, signOut, useSession } from "next-auth/react"

export default function Header(){
  const { data: session, status  } = useSession();
  const loading = status == "loading";
  const handleSignIn = e =>{
    e.preventDefault();
    signIn();
  }
  const handleSignOut = e =>{
    e.preventDefault();
    signOut();
  }
  let display = "";
  if(!session){
    display = (
      <>
        <p>not signed in</p>
        <a 
          href={`api/auth/signin`}
          onClick={handleSignIn} 
        >
          sign in
        </a>
      </>
    )
  } else if(session && session.user) {
    display = (<>
      <p>signed in as {session.user.email}</p>
      <a href={`/api/auth/signout`} onClick={handleSignOut}>
        sign out
      </a>
    </>)
  }
  return(
    <header>
      <div>
        {display}
      </div>
    </header>
  )
}