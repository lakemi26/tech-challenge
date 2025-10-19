import { text, colors } from "@/utils/tokens";

const textVariants = {
  h1: {
    weight: text.font.weight.lg,
    size: text.font.size["3xl"],
    lineHeight: text.font.lineHeight["2xl"],
  },
  h2: {
    weight: text.font.weight.md,
    size: text.font.size["xl"],
    lineHeight: text.font.lineHeight.xl,
  },
  h3: {
    weight: text.font.weight.md,
    size: text.font.size.md,
    lineHeight: text.font.lineHeight.lg,
  },
  h4: {
    weight: text.font.weight.md,
    size: text.font.size.sm,
    lineHeight: text.font.lineHeight.md,
  },
  body: {
    weight: text.font.weight.xs,
    size: text.font.size.xs,
    lineHeight: text.font.lineHeight.sm,
  },
  button: {
    weight: text.font.weight.sm,
    size: text.font.size.sm,
    lineHeight: text.font.lineHeight.xs,
  },
  caption: {
    weight: text.font.weight.xs,
    size: text.font.size.xs,
    lineHeight: text.font.lineHeight.xs,
  },
};

export default function Text({
  children,
  variant = "body",
  color = "primary",
  italic = false,
  className = "",
}: {
  children: React.ReactNode;
  variant?: keyof typeof textVariants;
  color?: keyof typeof colors.text;
  italic?: boolean;
  className?: string;
}) {
  const { weight, size, lineHeight } = textVariants[variant || "caption"];
  const styles: React.CSSProperties = {
    fontFamily: text.font.family,
    fontWeight: weight,
    fontSize: size,
    lineHeight,
    color: colors.text[color],
  };
  if (italic) {
    styles.fontStyle = "italic";
  }
  return (
    <span className={className} style={styles}>
      {children}
    </span>
  );
}
