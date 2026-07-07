import Link from "next/link";
import styles from "./Button.module.css";

export default function Button({
  variant = "primary", // primary, secondary, outline, ghost, coral
  size = "md", // sm, md, lg
  children,
  onClick,
  href,
  icon: Icon,
  loading = false,
  fullWidth = false,
  type = "button",
  disabled = false,
  ...props
}) {
  const buttonClass = [
    styles.btn,
    styles[`btn-${variant}`],
    styles[`btn-${size}`],
    fullWidth ? styles.fullWidth : "",
    disabled || loading ? styles.disabled : "",
  ].join(" ").trim();

  const content = (
    <>
      {loading && <span className={styles.spinner} />}
      {!loading && Icon && <Icon size={size === "sm" ? 16 : size === "lg" ? 22 : 18} className={styles.icon} />}
      <span>{children}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={buttonClass} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  );
}
