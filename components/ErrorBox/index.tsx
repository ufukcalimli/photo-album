import styles from "./ErrorBox.module.css";

function ErrorBox({ msg }) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.message}>{msg}</p>
    </div>
  );
}

export default ErrorBox;
