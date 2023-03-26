import ProgramItemDetail from "@/components/program-detail/program-item-detail";
import { useRouter } from 'next/router';

export default function ProgramId(){
  const router = useRouter();
  const { id } = router.query;
  if( id){
    return(
      <ProgramItemDetail id={id}/>
    )
  }
  else {
    return "no id";
  }
}