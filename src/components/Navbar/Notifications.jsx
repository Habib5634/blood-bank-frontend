'use client'
import React from 'react'

import { FaBell } from "react-icons/fa6";


const Notifications = ({showNtification,requests,handleShowNotification,handleMarkAsRead,handleMarkAllAsRead,notificationCounter}) => {
    
    return (
        <div className=' relative '>

            <FaBell onClick={handleShowNotification} className='cursor-pointer' size={25} />
            {notificationCounter > 0 && 
            <span onClick={handleShowNotification} className='absolute cursor-pointer -top-2 -right-2 w-4 h-4 text-[12px] rounded-full flex justify-center items-center text-white bg-red'>{notificationCounter}</span>
            }

            <div className={`${showNtification ? ' h-fit max-h-[500px] w-[300px] mt-2 rounded-lg shadow-shad' : 'h-0 overflow-hidden'} anim5  absolute right-0 bg-white top-full`}>
                <div className='flex flex-col gap-3 !w-full !h-full py-2'>
                    <h1 onClick={handleMarkAllAsRead} className='text-blue font-semibold pl-2 hover:text-darkBlue cursor-pointer anim5'>Mark all as read</h1>
                    {requests?.length > 0 ?
                        requests.map((req, i) => (
                            <div key={i} className={`${req?.isRead ? '':'bg-lightBlue'} p-2 !w-full`}>
                                <div className='flex items-center gap-4'>
                                    <img src={req?.requesterId?.profile} alt="" className='w-12 h-12 rounded-full' />
                                <p>You have new Request From {req?.requesterId?.firstName} {req?.requesterId?.lastName}</p>

                                </div>
                                <p onClick={()=>handleMarkAsRead(req?._id)} className={` ${req?.isRead ? 'hidden':'block'} text-[14px] text-end w-full hover:text-darkBlue cursor-pointer anim5 text-blue`}>Mark as Reak</p>
                            </div>
                        )) : (
                            <div className='p-2 w-full text-xl font-semibold text-nowrap'>No requests</div>
                        )
                    }

                </div>

            </div>



        </div>
    )
}

export default Notifications
