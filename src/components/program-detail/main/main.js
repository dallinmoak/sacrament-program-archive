import CSSModules from "react-css-modules";
import Item from "../item/item";
import styles from "../program-detail.module.css";

export default CSSModules(function Main(props) {
  const { presiding, conducting, openingHymn, openingPrayer, sacramentHymn,items, closingHymn, closingPrayer, fastSunday } = {
    ...props.programDetails,
  };
  const customItems = items.sort((a,b) => a.position - b.position).map(item =>{
    return {
      label: item.type,
      presentor: item.presentor,
      title: item.title,
    }
  })
  const contentList = [
    { label: "Presiding", presentor: presiding },
    { label: "Conducting", presentor: conducting },
    {
      label: "Opening Hymn",
      presentor: openingHymn.number,
      hymnTitle: openingHymn.title,
      hymnLink: openingHymn.link,
      isHymn: true,
    },
    { label: "Opening Prayer", presentor: openingPrayer },
    {
      label: "Sacrament Hymn",
      presentor: sacramentHymn.number,
      hymnTitle: sacramentHymn.title,
      hymnLink: sacramentHymn.link,
      isHymn: true,
      fastSunday: fastSunday,
    },
    ...customItems,
    {
      label: "Closing Hymn",
      presentor: closingHymn.number,
      hymnTitle: closingHymn.title,
      hymnLink: closingHymn.link,
      isHymn: true,
    },
    {
      label: "Closing Prayer", presentor: closingPrayer,
    }
  ];
  return (
    <div>
      {contentList.map((contentItem, index) => {
        return <Item key={index} content={contentItem} />;
      })}
    </div>
  );
}, styles);
