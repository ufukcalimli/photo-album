import styles from "./PageTitle.module.css";

function PageTitle() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Photo Album</h1>
    </div>
  );
}

export default PageTitle;
