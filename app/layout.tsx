import type { Metadata } from "next"
import { cookies } from "next/headers"

import { fontVariables } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { META_THEME_COLORS } from "@/hooks/use-meta-color"
import { ActiveThemeProvider } from "@/components/theme/active-theme"
import { ThemeProvider } from "@/components/theme/theme-provider"

import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "MS Admin",
    template: `%s - ${"MS Admin"}`,
  },
  keywords: ["Next.js", "React", "Tailwind CSS", "Server Components", "Radix UI"],
  icons: {
    icon: "/favicon.ico",
    // shortcut: "/favicon-16x16.png",
    // apple: "/apple-touch-icon.png",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const activeThemeValue = cookieStore.get("active_theme")?.value
  const isScaled = activeThemeValue?.endsWith("-scaled")

  return (
    <html lang="en" className={cn(fontVariables)} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>

      <body
        className={cn(
          "bg-background overscroll-none font-sans antialiased",
          activeThemeValue ? `theme-${activeThemeValue}` : "",
          isScaled ? "theme-scaled" : ""
        )}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange enableColorScheme>
          <ActiveThemeProvider initialTheme={activeThemeValue}>{children}</ActiveThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
