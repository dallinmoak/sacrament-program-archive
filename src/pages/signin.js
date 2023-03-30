import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import CSSModules from "react-css-modules";
import styles from "./signin.module.css";

import isAdmin from "@/common/admin-check";
import Image from "next/image";

export default CSSModules(function SignIn({ providers }) {
  let inner = "";
  if (providers.google.id) {
    inner = (
      <div styleName="sign-in">
        <Image
          src="/google_sign_in.png"
          height="92"
          width="382"
          alt="sign in with google"
          onClick={() => signIn(providers.google.id)}
        />
      </div>
    );
  }
  return <>{inner}</>;
}, styles);
export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    if (isAdmin(session.user.email)) {
      return { redirect: { destination: "/admin/main" } };
    }
    return { redirect: { destination: "/unauthorized-account" } };
  }

  const providers = await getProviders();
  return {
    props: { providers: providers ?? {} },
  };
}
