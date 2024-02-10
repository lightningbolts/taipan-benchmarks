
import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import Footer from '@components/Footer';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metedata = {
    title: 'Taipan Benchmarks',
    description: 'Discover all sorts of easy to use benchmarks.',
}

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
        <head>
            <script src="https://unpkg.com/tachyonjs@2.0.1/tachyon.min.js"
                    integrity="sha384-4iJteL1FYnj4Ju83AJvNthpx5gZ1QaXCamXhY3lxhAjTNXUN+NXq5LQV/fXOSRme" type="module"
                    crossOrigin defer></script>
        </head>
            <body>
            <Provider>
                <div className='main'>
                    <div className='gradient'>
                    </div>
                </div>
                <main className='app'>
                    <Nav/>
                    {children}
                    <Analytics/>
                    <SpeedInsights/>
                </main>

            </Provider>
            </body>
        </html>
)
}

export default RootLayout