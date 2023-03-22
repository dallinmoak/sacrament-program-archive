import CSSModules from "react-css-modules";
import styles from "./item.module.css";

export default CSSModules(
  function Item(props) {
    const { label, presentor, hymnTitle, hymnLink, title } = {
      ...props.content,
    };
    return (
      <div styleName="item-wrapper">
        <div styleName="item">
          <div styleName="label">{label}</div>
          <span styleName="spacer">
            <span />
          </span>
          {title ? (
            <div styleName="pres">
              <div styleName="multi">
                <span styleName="title">{title}</span>
                <span styleName="multi-pres">&nbsp;({presentor})</span>
              </div>
            </div>
          ) : (
            <div styleName="pres">{presentor}</div>
          )}
        </div>
        {hymnTitle ? (
          <div styleName="hymn">
            &ldquo;
            <a href={hymnLink} target="_blank">
              {hymnTitle}
            </a>
            &rdquo;
          </div>
        ) : null}
      </div>
    );
  },
  styles,
  { allowMultiple: true }
);
