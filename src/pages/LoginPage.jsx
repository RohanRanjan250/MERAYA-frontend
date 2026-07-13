import React from 'react'
import Login from '../components/Auth/Login'
import SEO from '../components/SEO'

export default function LoginPage() {
  return (
    <>
      <SEO title="Login" description="Log in to your Meraya account." noIndex />
      <Login />
    </>
  )
}