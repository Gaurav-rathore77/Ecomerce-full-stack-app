import React from 'react'
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/auth'

function Home() {
  const [auth , setAuth] = useAuth()
  return (

    <Layout>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
      <div>Home</div>
    </Layout>
  )
}

export default Home