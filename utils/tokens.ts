export const gradient = {
  color: (colors: string[]) =>
    `linear-gradient(90deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
};

const baseColors = {
  black: "#030213",
  white: "#FFFFFF",
  dark: "#101828",
  gray: "#E9EBEF",
  lightGray: "#F9FAFB",
  darkGray: "##E5E5E5",
  purple: "#9810FA",
  red: "#D4183D",
  green: "#00A63E",
  blue: "#165DFB",
  darkBlue: "#1E2939",
  blueGray: "#717182",
};

export const colors = {
  brand: {
    primary: baseColors.black,
    secondary: baseColors.purple,
    danger: baseColors.red,
    success: baseColors.green,
    info: baseColors.blue,
  },
  text: {
    primary: baseColors.dark,
    white: baseColors.white,
    tertiary: baseColors.blueGray,
    purple: baseColors.purple,
    blue: baseColors.blue,
  },
  background: {
    gradient: {
      landing: gradient.color([baseColors.blue, baseColors.purple]),
    },
    primary: baseColors.white,
    secondary: baseColors.lightGray,
    tertiary: baseColors.gray,
    dark: baseColors.dark,
    darkBlue: baseColors.darkBlue,
  },
  border: {
    primary: baseColors.darkGray,
  },
};

export const text = {
  font: {
    family: "'Inter', sans-serif",
    size: {
      xs: "14px",
      sm: "20px",
      md: "24px",
      xl: "30px",
      ["2xl"]: "36px",
      ["3xl"]: "40px",
    },
    lineHeight: {
      xs: "20px",
      sm: "24px",
      md: "30px",
      lg: "36px",
      xl: "45px",
      ["2xl"]: "60px",
    },
    weight: {
      xs: 400,
      sm: 500,
      md: 600,
      lg: 700,
    },
  },
};

export const spacing = {
  sm: "4px",
  md: "8px",
  lg: "16px",
  xl: "24px",
};
