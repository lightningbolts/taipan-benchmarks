
import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import Footer from '@components/Footer';

export const metedata = {
    title: 'Taipan Benchmarks',
    description: 'Discover all sorts of easy to use benchmarks.',
}

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <Provider>
                    <div className='main'>
                        <div className='gradient'>
                        </div>
                    </div>
                    <main className='app'>
                        <Nav />
                        {children}
                    </main>
                    {/* <Footer /> */}
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout