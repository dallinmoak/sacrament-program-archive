import Link from "next/link";

export default function ProgramItem(props) {
  const year = props.date.substring(0,4);
  console.log(year);
  const month = props.date.substring(4, 6);
  console.log(month);
  const day = props.date.substring(6,8);
  console.log(day);
  const dateObj = new Date(year,month -1,day);
  const formatOptions = {year: 'numeric', month: 'short', day: "numeric"}
  const dateFormat = dateObj.toLocaleDateString(undefined,formatOptions);
  return (
    <div>
      <Link href={`/program/${props.id}`}>{dateFormat}</Link>
    </div>
  );
}
