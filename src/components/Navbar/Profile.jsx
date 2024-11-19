'use client'
import Link from 'next/link'
import React, { useState } from 'react'

import { CgProfile } from 'react-icons/cg'


const Profile = ({handleLogout}) => {
    const [profile,setProfile] = useState(false)
  
  
    const handleShowProfile = ()=>{
        setProfile(!profile)
    }

  

  return (
    <div className=' relative '>

            <CgProfile onClick={handleShowProfile} className='cursor-pointer' size={25} />
            <div className={`${profile ? ' h-fit w-[200px] mt-2 rounded-lg shadow-shad' : 'h-0 overflow-hidden'} anim5  absolute right-0 bg-white top-full`}>
                <div className='flex flex-col gap-3 !w-full !h-full p-2'>
                   <Link href={'/profile'} className='text-start'>Profile</Link>
                   <button onClick={handleLogout} className='text-start'>Logout</button>

                </div>

            </div>



        </div>
  )
}

export default Profile
