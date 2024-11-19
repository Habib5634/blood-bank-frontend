'use client'
import ChatBox from '@/components/ChatComponents/ChatBox'
import Navbar from '@/components/Navbar'
import React from 'react'

const ChatPage = () => {
  return (
    <div className='flex flex-col  px-6 md:px-10 lg:px-16 2xl:px-0 mx-auto w-full max-w-[1440px]'>
            <Navbar />
            <ChatBox/>
    </div>
  )
}

export default ChatPage
