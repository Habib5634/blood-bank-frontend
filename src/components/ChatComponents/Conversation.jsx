'use client'
import React from 'react'
import { HiMiniBars3BottomRight } from "react-icons/hi2";
const Conversation = ({conversations,selectedConversationId,handleConversationClick,userData,handleShowConversations,showCons}) => {

    // console.log(userData)
    // console.log(conversations)  
  return (
    <div className={`${showCons ? 'w-1/12 overflow-hidden':'w-1/3'} anim5   h-full bg-red p-4 rounded-2xl`}>
      <div className={`flex w-full ${showCons ? 'justify-end':'justify-between'} anim5  items-center mb-2`}>
    <h2 className={`text-center ${showCons && 'hidden'} font-bold text-white`}>Conversations</h2>
    <HiMiniBars3BottomRight size={30}  className='text-white stroke-1 anim5' onClick={handleShowConversations} />
      </div>
    <div className='flex flex-col gap-3'>
            {conversations?.map((conv) => {
              // Filter out the logged-in user and get the other participant's name
              const otherParticipant = conv.participants.find(
                (p) => p._id !== userData?._id
              );

              return (
                <div
                  key={conv._id}
                  className={`p-2 flex gap-2 cursor-pointer items-center rounded-xl ${conv._id === selectedConversationId ? 'bg-white' : 'bg-gray-300'}`}
                  onClick={() => handleConversationClick(conv._id)}
                >
                  <img src={otherParticipant?.profile} alt={otherParticipant?.firstName} className={` w-10 h-10 rounded-full`} />
                  <div className={`${showCons? 'hidden':'flex flex-col justify-between'} `}>
                    <span className='font-semibold'>
                  {otherParticipant ? `${otherParticipant.firstName} ${otherParticipant.lastName}` : 'Unknown'}
                    </span>
                  <span className='font-semibold'>
                    {otherParticipant ? `${otherParticipant.bloodGroup} ` : 'Unknown'}
                    </span>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
 
  )
}

export default Conversation
