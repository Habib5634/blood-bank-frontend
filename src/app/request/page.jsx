'use client'
import Navbar from '@/components/Navbar'
import { acceptRequest, fetchRequest, rejectRequest } from '@/Store/Actions/userAction';
import { updateRequests } from '@/Store/ReduxSlice/fetchRequestsSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import Recieved from './Recieved';
import Requested from './Requested';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
// Initialize socket connection
const socket = io('http://localhost:5000');
const RequestPage = () => {
    const { isAuthenticated, userData } = useSelector((state) => state.userData)
    const dispatch = useDispatch();
    const { requests } = useSelector((state) => state.requests);
    const router = useRouter()
    const [activeTab, setActiveTab] = useState('recieved')
    const [isAccepted,setIsAccepted] = useState(null)
    // useEffect(() => {
    //     // Fetch initial requests data
    //     dispatch(fetchRequest());

    //     // Join user's room based on userId from auth or state
    //     const userId = userData?._id;
    //     socket.emit('joinRoom', userId);

    //     // Listen for new requests in real-time
    //     socket.on('newRequest', (data) => {
    //         console.log('Received newRequest event:', data);
    //         dispatch(fetchRequest()); // Refresh requests when a new one is received
    //     });
    //     socket.on('requestAccepted', (data) => {
    //         console.log('Request accept event:', data);
    //         if (data?.request?.requesterId === userData?._id) {
    //             alert("Request Accepted"); // Notify the user
    //         }
    //     });

    //     socket.on('requestRejected', (data) => {
    //         if (data?.request?.requesterId === userData?._id) {
    //             // alert("Request Accepted"); // Notify the user
    //             toast.success("Request Rejected"); // Notify the user
    //         }
    //     });

    //     // Listen for requestsUpdated event
    //     socket.on('requestsUpdated', (updatedRequests) => {
    //         console.log('Received requestsUpdated event:', updatedRequests);
    //         dispatch(updateRequests(updatedRequests));
    //     });

    //     // Clean up socket listeners on component unmount
    //     return () => {
    //         console.log('Cleaning up socket listeners');
    //         socket.off('newRequest');
    //         socket.off('requestsUpdated');
    //     };
    // }, [dispatch, socket, userData]);
    useEffect(() => {
        dispatch(fetchRequest())
    }, [dispatch])
    // console.log(requests)

    const handleChangeTab = (tab) => {
        setActiveTab(tab)
    }

    const recievedRequest = requests.filter(
        (request) => request.recipientId._id === userData?._id && request.isAccepted === false
    );
    const requestedRequest = requests.filter(
        (request) => request.requesterId._id === userData?._id
    );

    // useEffect(() => {
    //     if (!isAuthenticated) {
    //         router.push('/login')
    //     }

    // }, [userData, isAuthenticated])
    //   console.log(userData?._id)
      console.log("recieved",recievedRequest)
    //   console.log("requested",requestedRequest)
    const handleAccept = async (request) => {
        try {
            const requestId = request?._id
            await dispatch(acceptRequest(requestId)).unwrap();
            setIsAccepted(request)
            toast.success("Request Accepted")
            await dispatch(fetchRequest())
        } catch (error) {
            console.log('Reject failed:', error);
            toast.error("Something went wrong")
        }
    };

    const handleReject = async (requestId) => {
        try {
            await dispatch(rejectRequest(requestId)).unwrap();
            toast.success("Request deleted")
            await dispatch(fetchRequest())
        } catch (error) {
            console.log('Accept failed:', error);
            toast.error("Something went wrong")
        }
    };
    return (
        <div className='flex flex-col  px-6 md:px-10 lg:px-16 2xl:px-0 mx-auto w-full max-w-[1440px]'>
            <Navbar />
            <div className='flex  gap-6 items-center mt-24'>
                <h1 onClick={() => handleChangeTab('recieved')} className={` ${activeTab === 'recieved' ? 'text-blue font-semibold' : 'text-black'} text-xl cursor-pointer `}>Recieved Requests</h1>
                <h1 onClick={() => handleChangeTab('requested')} className={`${activeTab === 'requested' ? 'text-blue font-semibold' : 'text-black'} text-xl cursor-pointer `}>Requested</h1>


            </div>

            {activeTab === 'recieved' && <Recieved
                requests={recievedRequest}
                handleAccept={handleAccept}
                handleReject={handleReject}
                isAccepted={isAccepted}


            />

            }
            {activeTab === 'requested' && <Requested
                requests={requestedRequest}
                handleReject={handleReject}
            />

            }
        </div>
    )
}

export default RequestPage
