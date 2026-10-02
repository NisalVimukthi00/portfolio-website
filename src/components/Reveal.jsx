import useReveal from "../animations/useReveal.js";

/**
 * Reveal — wraps content in a scroll-triggered fade/slide.
 * Falls back to visible content if IntersectionObserver is missing.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  variant = "",
  delay = 0,
  className = "",
  ...rest
}) {
  const ref = useReveal();
  const variantClass = variant ? `reveal--${variant}` : "";

  return (
    <Tag
      ref={ref}
      className={`reveal ${variantClass} ${className}`.trim()}
      style={delay ? { "--reveal-delay": `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
