import React from 'react'
import {Button} from '../ui/button.jsx'
import { UserButton, useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom';
function Header() {
  const{isSignedIn, user } = useUser();
  return (
    <div className='p-3 px-5 flex justify-between shadow-md'>
      <img src='/logo.svg' width={60} height={50}/>

      {isSignedIn
      ?<div className='flex gap-2 items-center'>
        <Link to={'/dashboard'}>
        <Button variant="outline">Dashboard</Button>
        </Link>
        <UserButton />
      </div>
      :<Link to={'/auth/sign-in'}>
        <Button>Get Started</Button>
      </Link>}
    </div>
  )
}

export default Header
