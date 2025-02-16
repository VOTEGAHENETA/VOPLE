import styles from './index.module.scss';

function LoadingSpinner() {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner} />
    </div>
  );
}

export default LoadingSpinner;
