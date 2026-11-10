import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const roundo = localFont({
  src: [
    { path: "./fonts/Roundo-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Roundo-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Roundo-Semibold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-roundo",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Let's Talk, Rochdale",
    template: "%s · Let's Talk, Rochdale",
  },
  description:
    "A free wellbeing centre in a shop on Drake Street, Rochdale. Women's group on Mondays, English class and men's club on Wednesdays, community lunch on Thursdays, men's meditation on Sundays. No referral, nothing to pay.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${roundo.variable} h-full`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
