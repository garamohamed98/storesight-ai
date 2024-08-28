import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material";

//color design tokens
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        white: {
          100: "#323232",
          200: "#646465",
          300: "#959697",
          400: "#c7c8ca",
          500: "#f9fafc",
          600: "#fafbfd",
          700: "#fbfcfd",
          800: "#fdfdfe",
          900: "#fefefe",
        },
        purple: {
          100: "#1c0b2e",
          200: "#37165c",
          300: "#53228b",
          400: "#6e2db9",
          500: "#8a38e7",
          600: "#a160ec",
          700: "#b988f1",
          800: "#d0aff5",
          900: "#e8d7fa",
        },
        blue: {
          100: "#0b1e2e",
          200: "#163c5c",
          300: "#22598b",
          400: "#2d77b9",
          500: "#3895e7",
          600: "#60aaec",
          700: "#88bff1",
          800: "#afd5f5",
          900: "#d7eafa",
        },
        red: {
          100: "#2c120a",
          200: "#582313",
          300: "#84351d",
          400: "#b04626",
          500: "#dc5830",
          600: "#e37959",
          700: "#ea9b83",
          800: "#f1bcac",
          900: "#f8ded6",
        },
        yellow: {
          100: "#332701",
          200: "#664d03",
          300: "#997404",
          400: "#cc9a06",
          500: "#ffc107",
          600: "#ffcd39",
          700: "#ffda6a",
          800: "#ffe69c",
          900: "#fff3cd",
        },
        green: {
          100: "#102c1b",
          200: "#205836",
          300: "#308451",
          400: "#40b06c",
          500: "#50dc87",
          600: "#73e39f",
          700: "#96eab7",
          800: "#b9f1cf",
          900: "#dcf8e7",
        },
      }
    : {
        white: {
          100: "#fefefe",
          200: "#fdfdfe",
          300: "#fbfcfd",
          400: "#fafbfd",
          500: "#f9fafc",
          600: "#c7c8ca",
          700: "#959697",
          800: "#646465",
          900: "#323232",
        },
        purple: {
          100: "#e8d7fa",
          200: "#d0aff5",
          300: "#b988f1",
          400: "#a160ec",
          500: "#8a38e7",
          600: "#6e2db9",
          700: "#53228b",
          800: "#37165c",
          900: "#1c0b2e",
        },
        blue: {
          100: "#d7eafa",
          200: "#afd5f5",
          300: "#88bff1",
          400: "#60aaec",
          500: "#3895e7",
          600: "#2d77b9",
          700: "#22598b",
          800: "#163c5c",
          900: "#0b1e2e",
        },
        red: {
          100: "#f8ded6",
          200: "#f1bcac",
          300: "#ea9b83",
          400: "#e37959",
          500: "#dc5830",
          600: "#b04626",
          700: "#84351d",
          800: "#582313",
          900: "#2c120a",
        },
        yellow: {
          100: "#fff3cd",
          200: "#ffe69c",
          300: "#ffda6a",
          400: "#ffcd39",
          500: "#ffc107",
          600: "#cc9a06",
          700: "#997404",
          800: "#664d03",
          900: "#332701",
        },
        green: {
          100: "#dcf8e7",
          200: "#b9f1cf",
          300: "#96eab7",
          400: "#73e39f",
          500: "#50dc87",
          600: "#40b06c",
          700: "#308451",
          800: "#205836",
          900: "#102c1b",
        },
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);

  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.purple[500],
            },
            secondary: {
              main: colors.green[500],
            },
            neutral: {
              dark: colors.green[700],
              main: colors.green[500],
              light: colors.green[100],
            },
            background: {
              default: colors.purple[500],
            },
          }
        : {
            primary: {
              main: colors.purple[500],
            },
            secondary: {
              main: colors.purple[500],
            },
            neutral: {
              dark: colors.purple[700],
              main: colors.purple[500],
              light: colors.purple[100],
            },
            background: {
              default: colors.white[500],
            },
          }),
    },
    Typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

//context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};
