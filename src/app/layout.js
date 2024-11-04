import { Roboto } from 'next/font/google'
import '@/app/global.css'

import Footer from '@/components/ssr/Footer'

const nunitoFont = Roboto({
    subsets: ['latin'],
    display: 'swap',
    weight: ['100','300','500','700']
})

const RootLayout = ({ children }) => {
    return (
        <html lang="en" className={nunitoFont.className}>
        <body className="antialiased">

            {children}
        <Footer/>
        </body>
        </html>
    )
}

export const metadata = {
    title: 'Yeoley',
}

export default RootLayout
