import type { Metadata } from 'next'
import ClientLayout from '../components/ClientLayout'

export const metadata: Metadata = {
  title: 'The Commission',
  description: 'Tercera Liga',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
