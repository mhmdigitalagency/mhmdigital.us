"use client"

import React from 'react'
import UserButton from '../UserButton'
import SignInButton from '../SignInButton'
import { useSession } from '@/lib/auth-client';

const UserOrSignIn = () => {

  const session = useSession()
  const user = session.data?.user

  return (
    <>
      { user && <UserButton user={user} />}
      { !user && <SignInButton /> }
    </>
  )
}

export default UserOrSignIn
