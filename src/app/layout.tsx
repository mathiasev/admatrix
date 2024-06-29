import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";


import Providers from "./_components/providers";
import { Wrapper } from "~/components/layout/wrapper";


export const metadata = {
  title: "Ad Matrix | %s",
  description: "The ad preview tool",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`} suppressHydrationWarning>
      <body>
        <Providers>
          <Wrapper>
            {children}
          </Wrapper>
        </Providers>
      </body>
    </html >
  );
}
