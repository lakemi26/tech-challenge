export const gradient = {
  color: (colors: string[]) =>
    `linear-gradient(90deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
};

export const colors = {
  brand: {
    primary: "#030213",
    secondary: "#9810FA",
    danger: "#D4183D",
    success: "#00A63E",
    info: "#165DFB",
  },
  text: {
    primary: "#101828",
    secondary: "#8292B1",
    tertiary: "#717182",
  },
  background: {
    gradient: {
      landing: gradient.color(["#165DFB", "#9810FA"]),
    },
    primary: "#FFFFFF",
    secondary: "#F9FAFB",
    tertiary: "#E9EBEF",
  },
  border: {
    primary: "#E5E5E5",
  },
};
