import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import SmoothScroll from "@/components/SmoothScroll";
import Script from "next/script";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://akashsatpute.dev"),
  title: {
    default: "Akash Satpute | AI Engineer & Full Stack Developer",
    template: "%s | Akash Satpute"
  },
  description: "M.Tech Student in Cyber Security at NIT Patna and AI Engineer specializing in Retrieval-Augmented Generation (RAG), Full Stack Development, and developer community leadership. Explore Akash's work, internships, achievements, and blog posts.",
  keywords: [
    "Akash Satpute",
    "Akash Satpute Portfolio",
    "NIT Patna Cyber Security",
    "M.Tech Cyber Security NIT Patna",
    "AI Engineer",
    "Computer Engineering",
    "GDG On Campus Lead",
    "RAG AI Chatbot",
    "C-DAC Intern",
    "Physics Wallah Intern",
    "Next.js Developer India",
    "TypeScript Full Stack"
  ],
  authors: [{ name: "Akash Satpute", url: "mailto:assatpute123456@gmail.com" }],
  creator: "Akash Satpute",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://akashsatpute.dev",
    title: "Akash Satpute | AI Engineer & Full Stack Developer",
    description: "M.Tech Student in Cyber Security at NIT Patna and AI Engineer specializing in Retrieval-Augmented Generation (RAG), Full Stack Development, and developer community leadership.",
    siteName: "Akash Satpute Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Akash Satpute - AI Engineer & Full Stack Developer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Akash Satpute | AI Engineer & Full Stack Developer",
    description: "AI Engineer, Full Stack Developer, and GDG On Campus Lead building scalable intelligent systems.",
    images: ["/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} h-full antialiased`}>
      <head>
        {/* Preload hero poster image early so LCP is not delayed by video element discovery */}
        <link rel="preload" as="image" href="/hero-poster.webp" fetchPriority="high" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Providers>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </Providers>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "xeljew263a");
          `}
        </Script>
      </body>
    </html>
  );
}
