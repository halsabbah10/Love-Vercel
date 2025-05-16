import { Sacramento, Press_Start_2P, Noto_Naskh_Arabic } from "next/font/google";

export const scriptFont = Sacramento({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
});

export const pixelFont = Press_Start_2P({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pixel",
});

export const arabicFont = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
});