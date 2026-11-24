import './globals.css'

import {SpeedInsights} from '@vercel/speed-insights/next'
import type {Metadata} from 'next'
import {Jost, Montserrat} from 'next/font/google'
import {draftMode} from 'next/headers'
import {VisualEditing} from 'next-sanity/visual-editing'
import {Toaster} from 'sonner'

import DraftModeToast from '@/app/components/DraftModeToast'
import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import {sanityFetch, SanityLive} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'
import {handleError} from '@/app/client-utils'

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(): Promise<Metadata> {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  })
  const title = 'TEAM Coalition'
  const description =
    'Training and fan programs that make responsible alcohol service part of great hospitality at sports and entertainment venues.'

  const ogImage = resolveOpenGraphImage(settings?.ogImage)
  let metadataBase: URL | undefined = undefined
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

// Free look-alikes for Futura (headings) and Century Gothic (text), used only on devices that do not have the real fonts.
const jost = Jost({
  variable: '--font-jost',
  weight: ['500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

const montserrat = Montserrat({
  variable: '--font-montserrat',
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export default async function RootLayout({children}: LayoutProps<'/'>) {
  const {isEnabled: isDraftMode} = await draftMode()

  return (
    <html lang="en" className={`${jost.variable} ${montserrat.variable}`}>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <div className="min-h-screen">
          {/* The <Toaster> component is responsible for rendering toast notifications used in /app/client-utils.ts and /app/components/DraftModeToast.tsx */}
          <Toaster />
          {isDraftMode && (
            <>
              <DraftModeToast />
              {/*  Enable Visual Editing, only to be rendered when Draft Mode is enabled */}
              <VisualEditing />
            </>
          )}
          {/* The <SanityLive> component is responsible for making all sanityFetch calls in your application live, so should always be rendered. */}
          <SanityLive onError={handleError} />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </div>
        <SpeedInsights />
      </body>
    </html>
  )
}
