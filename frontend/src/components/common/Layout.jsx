import React from 'react'
import Header from './Header'
import Footer from './Footer'
import ContactForm from './ContactForm'
import Newsletter from './Newsletter'

const Layout = ({children}) => {
    return (
        <>
            <Header />
            {children}
            <Newsletter/>
            <Footer />

        </>
    )
}

export default Layout
