import './globals.css'

export const metadata = {
  title: 'Sacrament Program Archive',
  description: '5th Ward sacrament program archive tool',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
