import formatDate from "@/common/format-date";
import Link from "next/link";

export default function ProgramItem(props) {
  const dateFormat = formatDate(props.date,{year: 'numeric', month: 'short', day: "numeric"});
  return (
    <div>
      <Link href={`/program/${props.id}`}>{dateFormat}</Link>
    </div>
  );
}
