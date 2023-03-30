import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();
  const loading = status == "loading";
  const handleSignIn = (e) => {
    e.preventDefault();
    signIn();
  };
  const handleSignOut = (e) => {
    e.preventDefault();
    signOut();
  };
  let display = "";
  if (!session) {
    display = (
      <>
        <span>
          <a href={`api/auth/signin`} onClick={handleSignIn}>
            Sign in
          </a>{" "}
          to access admin tools
        </span>
      </>
    );
  } else if (session && session.user) {
    display = (
      <>
        <span>signed in as {session.user.email}</span>
        <a href={`/api/auth/signout`} onClick={handleSignOut}>
          <button>sign out</button>
        </a>
      </>
    );
  }
  return (
    <header>
      <div>{display}</div>
    </header>
  );
}
