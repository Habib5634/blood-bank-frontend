import React from 'react'

const Requested = ({ requests,  handleReject }) => {
  
  return (
    <div className='shadow-lightshad rounded-2xl mt-4 p-4'>
    {requests?.length > 0 ?

        <>
            {requests.map((req, i) => (
                <div className='flex justify-between mb-4 md:mb-6' key={i}>
                    <div className='flex gap-2 items-center'>
                        <img src={req?.requesterId?.profile} alt={req?.requesterId?.firstName} className='w-10 h-10 md:h-16 md:w-16  rounded-full' />
                        <p>You requested <span className='font-bold text-red '>{req?.recipientId?.bloodGroup}</span> blood from <span className='font-bold'>{req?.recipientId?.firstName} {req?.recipientId?.lastName}</span> in <span className='font-bold'>{req?.recipientId?.city}</span></p>

                    </div>
                    <div className='flex items-center gap-4'>
                       
                        <button onClick={() => handleReject(req?._id)} className='py-1.5 px-4 rounded-xl font-semibold bg-red text-white'>Withdraw</button>

                    </div>

                </div>
            ))}
        </>
        :
        <div className='text-lg font-semibold'>No Requests</div>
    }

</div>
  )
}

export default Requested
