'use client'
import Link from 'next/link';
import React from 'react'
import { ImUsers } from "react-icons/im";
const Requests = ({showRequests,handleShowRequests,requests,requestCounter,handleAccept,handleReject}) => {
    
  return (
    <div className=' relative '>

            <ImUsers onClick={handleShowRequests} size={25} className='cursor-pointer hidden lg:block' />
          <Link href={'/request'}>
            <button className='header-link font-semibold block lg:hidden'>Requests</button>
          </Link>
            {requestCounter > 0 && 
            <span onClick={handleShowRequests} className='absolute cursor-pointer -top-2 -right-2 w-4 h-4 text-[12px] rounded-full flex justify-center items-center text-white bg-red'>{requestCounter}</span>
            }
            <div className={`${showRequests ? ' h-fit max-h-[500px] w-[250px] md:w-[400px] mt-2 rounded-2xl shadow-shad' : 'h-0 overflow-hidden'} anim5  absolute right-0 bg-white top-full`}>
                <div className='flex flex-col gap-3 !w-full !h-full py-2'>
                <h1 className='text-black pl-2  cursor-pointer anim5 text-lg font-semibold'>Requests For Blood Donations</h1>
                    
                    {requests?.length > 0 ?
                        requests.map((req, i) => (
                            <div key={i} className='p-2 !w-full'>
<div className='flex items-center gap-4'>
                                    <img src={req?.requesterId?.profile} alt="" className='w-12 h-12 rounded-full' />
                                <div>
                                <p>You have new Request From {req?.requesterId?.firstName} {req?.requesterId?.lastName}</p>
                                <div className='flex items-center gap-4 mt-2'>
                                    <button onClick={()=>handleAccept(req?._id)} className='py-1.5 px-4 rounded-xl font-semibold bg-red text-white'>Accept</button>
                                    <button onClick={()=>handleReject(req?._id)} className='py-1.5 px-4 rounded-xl font-semibold bg-blue text-white'>Reject</button>

                                </div>
                                </div>

                                </div>
                                {/* <p>You have new Request From {req?.requesterId?.firstName} {req?.requesterId?.lastName}</p> */}

                            </div>
                        )) : (
                            <div className='p-2 w-full text-xl font-semibold text-nowrap'>No requests</div>
                        )
                    }
                    <Link href={'/request'} >

<h1 className='text-center font-medium cursor-pointer'>See All</h1>
                    </Link>
                </div>

            </div>



        </div>
  )
}

export default Requests
