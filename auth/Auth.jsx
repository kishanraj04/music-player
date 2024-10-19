import React from 'react'
import { loginEndpoint } from '../spotify'

function Auth() {
  return (
    <div>
        <a href={loginEndpoint}>Login</a>
    </div>
  )
}

export default Auth