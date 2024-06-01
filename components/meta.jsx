import styles from './meta.module.css';

export const Meta = ({ title, subTitle, dateCreated, links, className }) => {
  return (
    <div className={`monospace ${styles.meta} ${className}`}>
      <div className="stack align-start">
        <div>{title}</div>

        <div className="caption">{subTitle}</div>
      </div>

      <div className="stack align-end">
        <div>{dateCreated}</div>

        <div className="caption">{links}</div>
      </div>
    </div>
  );
};
