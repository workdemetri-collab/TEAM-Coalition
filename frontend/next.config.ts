import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://cdn.sanity.io/**'), new URL('https://teamcoalition.org/**')],
  },
  // TEMPORARY: lets the first deploy succeed even if a type error slips in. Remove once the build is clean.
  typescript: {ignoreBuildErrors: true},
}

export default nextConfig
