import Header from "./header.js";

export default function Layout({ children }){
  return(
    <>
      <Header />
      {children}
    </>
  )
}