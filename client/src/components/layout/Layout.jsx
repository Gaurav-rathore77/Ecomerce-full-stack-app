import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify'
function Layout({children}) {
  return (
    <div>
        <Header/>
        <main>
          <ToastContainer/>
        {children}
        </main>
        <Footer/>
    </div>

  )
}

export default Layout