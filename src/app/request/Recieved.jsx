import React from 'react'

const Recieved = ({ requests, handleAccept, handleReject,isAccepted }) => {
    console.log(isAccepted)

    return (
        <div className='shadow-lightshad rounded-2xl mt-4 p-4'>
            {isAccepted !== null ? 
                <div className='flex justify-between mb-4 md:mb-6' >
                            <div className='flex gap-2 items-center'>
                                <img src={isAccepted?.requesterId?.profile} alt={isAccepted?.requesterId?.firstName} className='w-10 h-10 md:h-16 md:w-16  rounded-full' />
                                <p>{isAccepted?.requesterId?.firstName} {isAccepted?.requesterId?.lastName} needs {isAccepted?.recipientId?.bloodGroup} in {isAccepted?.requesterId?.city}</p>

                            </div>
                            
                           <h1>RequestAccepted</h1>

                        </div>:null
                }
            {requests?.length > 0 ?

                <>
                
                    {requests.map((req, i) => (
                        <div className='flex justify-between mb-4 md:mb-6' key={i}>
                            <div className='flex gap-2 items-center'>
                                <img src={req?.requesterId?.profile} alt={req?.requesterId?.firstName} className='w-10 h-10 md:h-16 md:w-16  rounded-full' />
                                <p>{req?.requesterId?.firstName} {req?.requesterId?.lastName} needs {req?.recipientId?.bloodGroup} in {req?.requesterId?.city}</p>

                            </div>
                            
                            <div className='flex items-center gap-4'>
                                <button onClick={() => handleAccept(req)} className='py-1.5 px-4 rounded-xl font-semibold bg-blue text-white'>Accept</button>
                                <button onClick={() => handleReject(req?._id)} className='py-1.5 px-4 rounded-xl font-semibold bg-red text-white'>Reject</button>

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

export default Recieved
