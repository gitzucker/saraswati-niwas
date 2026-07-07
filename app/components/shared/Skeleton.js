import styles from "./Skeleton.module.css";

export default function Skeleton({
  variant = "text", // text, title, rect, circle, card
  width,
  height,
  className = "",
  count = 1
}) {
  const skeletonClass = [
    styles.skeleton,
    styles[variant],
    className
  ].join(" ").trim();

  const inlineStyle = {
    width: width || undefined,
    height: height || undefined
  };

  const renderSkeleton = (index) => (
    <div
      key={index}
      className={skeletonClass}
      style={inlineStyle}
    />
  );

  if (variant === "card") {
    return Array.from({ length: count }).map((_, i) => (
      <div key={i} className={styles.cardSkeleton}>
        <div className={`${styles.skeleton} ${styles.image}`} style={{ height: "200px" }} />
        <div className={styles.cardBody}>
          <div className={`${styles.skeleton} ${styles.title}`} style={{ width: "70%" }} />
          <div className={`${styles.skeleton} ${styles.text}`} style={{ width: "40%", marginBottom: "16px" }} />
          <div className={styles.cardFooter}>
            <div className={`${styles.skeleton} ${styles.text}`} style={{ width: "30%", height: "20px" }} />
            <div className={`${styles.skeleton} ${styles.circle}`} style={{ width: "36px", height: "36px" }} />
          </div>
        </div>
      </div>
    ));
  }

  if (count > 1) {
    return (
      <div className={styles.group}>
        {Array.from({ length: count }).map((_, i) => renderSkeleton(i))}
      </div>
    );
  }

  return renderSkeleton(0);
}
