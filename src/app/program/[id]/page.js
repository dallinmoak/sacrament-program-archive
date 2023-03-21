import ProgramItemDetail from "@/components/program-item-detail";

export default function Page({ params}){
  if( params.id){
    return(
      <ProgramItemDetail id={params.id}/>
    )
  }
  else {
    return "no id";
  }
}