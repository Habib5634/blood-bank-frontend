'use client'
import React, { useEffect, useRef } from 'react'
import { BsFillSendFill } from "react-icons/bs";

const Messages = ({ messages, setMessage, handleSendMessage, userData, message,selectedConversationId,showCons }) => {
  // console.log(messages)
  // console.log(userData?._id === messages[0]?.receiverId?._id)
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Scroll to the latest message
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  return (
    <div className={`${showCons ? 'w-11/12 ':'w-2/3'} anim5   h-full shadow-lightshad p-4 rounded-2xl flex flex-col justify-between`}>
      {selectedConversationId !==null ? (
        <>
        <h2 className='text-center font-bold py-2 rounded-t-2xl bg-red text-white border'>
        {userData?._id === messages[0]?.receiverId?._id ?
          (<>
            {messages[0]?.senderId?.firstName} {messages[0]?.senderId?.lastName || 'Donor'}
          </>) :
          (<>
            {messages[0]?.receiverId?.firstName} {messages[0]?.receiverId?.lastName || 'Donor'}

          </>)
        }
        {/* {messages[0]?.receiverId?.firstName} {messages[0]?.receiverId?.lastName || 'Donor'} */}
      </h2>
      <div className='h-full overflow-y-auto'>
        {messages?.map((msg) => (
          <div key={msg._id} className={` flex items-center ${userData?._id === msg?.senderId?._id && 'justify-end' } p-2`}>
            <div className={`${userData?._id === msg?.senderId?._id ? ' bg-blue text-white ' :'shadow-shad'} p-2  rounded-xl min-w-[130px] flex flex-col`}>

            <strong>{msg.senderId.firstName} {msg.senderId.lastName} 
              </strong> 
            
            {msg.message}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className=' border flex items-center gap-1 shadow-shad rounded-2xl '>
        <input value={message} type="text" className='w-[95%] py-2 px-6 focus:outline-none' name='message' onChange={(e) => setMessage(e.target.value)} />
        <button type='submit'>

          <BsFillSendFill size={20} />
        </button>
      </form ></>
      ):(
        <div className='flex flex-col justify-center items-center h-full w-full'>
          <h1 className='font-bold'>No Conversation is Selected</h1>
          <h1 className='font-semibold'>Select Conversation to start the chat</h1>
        </div>
      )}
      
    </div>
  )
}

export default Messages
