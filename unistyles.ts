import { StyleSheet } from 'react-native-unistyles'

const sizeScale= 4 // .25rem
const lightTheme = {
    colors: {
        "primary.100":"#9FA2AA",
        "primary.200":"#6F747F",
        "primary.300":"#3F4555",
        "primary.400":"#0F172A",
        "primary.500":"#080C15",
        "secondary.100":"#F2F7FF",
        "secondary.200":"#98BCFB",
        "secondary.300":"#75A5F9",
        "secondary.400":"#538FF8",
        "secondary.500":"#325695",
        "success.100":"#C0DAC6",
        "success.200":"#82B68C",
        "success.300":"#589D66",
        "success.400":"#2E8540",
        "success.500":"#1C5026",
        "warning.100":"#FFD3B3B2",
        "warning.200":"#FFA766",
        "warning.300":"#FF8A33",
        "warning.400":"#FF6D00",
        "warning.500":"#803700",
        "error.100":"#FFC4C1",
        "error.200":"#FF8983",
        "error.300":"#FF6259",
        "error.400":"#FF3B30",
        "error.500":"#FF3B30",
        "neutral.100":"#E9E9E9",
        "neutral.200":"#949896",
        "neutral.300":"#454A48",
        "neutral.400":"#171D1A",
        "neutral.500":"#0C0F0D",
        "shades.white":"#FFFFFF",
        "shades.black":"#000000",

    },
    // typography
    typography:{

    },
    // border
    border:{
        
    },
    // spacing, typography, border, etc
    space: (v: number) => v * sizeScale,
    // font sizes, line heights, letter spacings, etc.
    fontSizes: {
        h1: 48,
        h2: 32,
        h3: 24,
        h4: 20,
        h5: 18,
        h6: 16,
        p: 16,
    },
    // line heights
    lh:(v: number) => v * 1.2,
    // font weights
    fontWeights: {
        regular: "Urbanist_400Regular",
        semibold: "Urbanist_500Medium",
        medium: "Urbanist_600SemiBold",
        bold: "Urbanist_700Bold",
    },

    // functions, external imports, etc.
    gap: (v: number) => v * 8
}
const appThemes = {
    light: lightTheme,
}

const breakpoints = {
    xs: 0, // <-- make sure to register one breakpoint with value 0
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536
    // use as many breakpoints as you need
}

type AppThemes = typeof appThemes
type AppBreakpoints = typeof breakpoints

declare module 'react-native-unistyles' {
    export interface UnistylesThemes extends AppThemes {}
    export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
    themes: appThemes,
    breakpoints,
    settings:{
        initialTheme:"light"
    }
})