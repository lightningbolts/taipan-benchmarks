
import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';

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
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout