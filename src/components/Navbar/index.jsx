'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CgProfile } from "react-icons/cg";
import Notifications from './Notifications';
import Requests from './Requests';
import { acceptRequest, fetchRequest, fetchUserData, markAllAsRead, markRead, rejectRequest } from '@/Store/Actions/userAction';
import { updateRequests } from '@/Store/ReduxSlice/fetchRequestsSlice';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';
import { IoChatboxEllipses } from "react-icons/io5";
import Profile from './Profile';
import { FaBars } from 'react-icons/fa6';
import { IoMdCloseCircle } from "react-icons/io";
import { useRouter } from 'next/navigation';
import { clearAuth } from '@/Store/ReduxSlice/userSlice';
// Initialize socket connection
const socket = io('http://localhost:5000');
const Navbar = () => {
  const { isAuthenticated, userData } = useSelector((state) => state.userData)

  const [showNtification, setShowNotification] = useState(false)
  const [showRequests, setShowRequests] = useState(false)
  const [notificationCounter, setNotificationCounter] = useState(0)
  const [requestCounter, setRequestCounter] = useState(0)
  const dispatch = useDispatch();
  const scrollDirection = useSelector((state) => state.scroll.direction);
  const { requests } = useSelector((state) => state.requests);
  const [showSidebar, setShowSidebar] = useState(false)
  const router = useRouter()
  useEffect(() => {
    // Fetch initial requests data
    dispatch(fetchRequest());

    // Join user's room based on userId from auth or state
    const userId = userData?._id;
    socket.emit('joinRoom', userId);

    // Listen for new requests in real-time
    socket.on('newRequest', (data) => {
      console.log('Received newRequest event:', data);
      dispatch(fetchRequest()); // Refresh requests when a new one is received
    });
    socket.on('requestAccepted', (data) => {
      console.log('Request accept event:', data);
      // if(data?.request?.requesterId === userData?._id){
      // toast.success(data.message); // Notify the user

      // }
    });

    socket.on('requestRejected', (data) => {
      console.log(data)
      //  toast.success(data.message);
      dispatch(fetchRequest());
    });

    // Listen for requestsUpdated event
    socket.on('requestsUpdated', (updatedRequests) => {
      console.log('Received requestsUpdated event:', updatedRequests);
      dispatch(updateRequests(updatedRequests));
    });

    // Clean up socket listeners on component unmount
    return () => {
      console.log('Cleaning up socket listeners');
      socket.off('newRequest');
      socket.off('requestAccepted');
      socket.off('requestRejected');
      socket.off('requestsUpdated');
    };
  }, [dispatch]);
  const handleShowNotification = () => {
    setShowNotification(!showNtification)
    setShowRequests(false)
  }
  const handleShowRequests = () => {
    setShowRequests(!showRequests)
    setShowNotification(false)
  }


  useEffect(() => {
    dispatch(fetchUserData())
    dispatch(fetchRequest())
  }, [dispatch])

  const filteredRequests = requests.filter(
    (request) => request.recipientId._id === userData?._id && request.isAccepted === false
  );

  const handleMarkAsRead = async (requestId) => {


    try {
      await dispatch(markRead(requestId)).unwrap();

      toast.success("Marked As Read");
      await dispatch(fetchRequest());

    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const userId = userData._id
      await dispatch(markAllAsRead(userId)).unwrap();
      toast.success("Marked As Read");
      await dispatch(fetchRequest());
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }

  }

  const counterLength = filteredRequests?.filter(
    (req) => req?.isRead === false
  )

  useEffect(() => {
    setNotificationCounter(counterLength?.length)
    setRequestCounter(filteredRequests?.length)
  }, [filteredRequests, counterLength])


  const handleAccept = async (requestId) => {
    try {
      await dispatch(acceptRequest(requestId)).unwrap();
      toast.success("Request Accepted")
      await dispatch(fetchRequest())
    } catch (error) {
      console.log('Accept failed:', error);
      toast.error("Something went wrong")
    }
  };

  const handleReject = async (requestId) => {
    try {
      await dispatch(rejectRequest(requestId)).unwrap();

      toast.success("Request deleted")
      await dispatch(fetchRequest())
    } catch (error) {
      console.log('Reject failed:', error);
      toast.error("Something went wrong")
    }
  };

  const handleLogout = async()=>{
    try {
      dispatch(clearAuth());
      toast.success("Logout Successfully")
      router.push('/')
      setShowSidebar(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleShowSidebar = () => {
    setShowSidebar(!showSidebar)
  }
  return (
    <div className={`bg-white w-full ${(scrollDirection === null || scrollDirection == 'up') ? 'sticky z-50 bg-white shadow-lg opacity-100' : 'opacity-0 static'} -mb-20  anim5  top-0 `}>

      <div className={`flex w-full   px-6 md:px-10 lg:px-16 2xl:px-0 mx-auto   max-w-[1440px] relative`}>
        <div className='flex justify-between items-center w-full h-20'>
          <Link href={'/'}>        <h1 className='text-3xl font-bold '>Blood Bank</h1>
          </Link>
          <div className=' items-center hidden lg:flex gap-6'>
            <Link href={'/'}>
              <button className='header-link font-semibold '>Home</button>
            </Link>
            <button className='header-link font-semibold '>Find Donor</button>
            <button className='header-link font-semibold '>Become a Donor</button>
            <button className='header-link font-semibold '>About Us</button>

            {isAuthenticated ? (
              <>
                <Link href={'/chat'}>
                  <IoChatboxEllipses size={25} className='hover:text-red anim5 cursor-pointer' />
                </Link>
                <Requests
                  showRequests={showRequests}
                  handleShowRequests={handleShowRequests}
                  requests={filteredRequests}
                  requestCounter={requestCounter}
                  handleAccept={handleAccept}
                  handleReject={handleReject}
                />
                <Notifications
                  showNtification={showNtification}
                  handleShowNotification={handleShowNotification}
                  requests={filteredRequests}
                  handleMarkAsRead={handleMarkAsRead}
                  handleMarkAllAsRead={handleMarkAllAsRead}
                  notificationCounter={notificationCounter}
                />

                <Profile
                handleLogout={handleLogout}
                />
              </>
            ) :

              <Link href={'/login'}>
                <button className='px-6 py-2.5 rounded-full bg-red text-white text-[18px] font-semibold'>Login / Register</button>
              </Link>
            }

          </div>
          <div className=' lg:hidden flex gap-6'>
          {isAuthenticated ? (
                <>
                  <Link href={'/chat'}>
                    <IoChatboxEllipses size={25} className='hover:text-red anim5 cursor-pointer' />
                  </Link>
                  
                  <Notifications
                    showNtification={showNtification}
                    handleShowNotification={handleShowNotification}
                    requests={filteredRequests}
                    handleMarkAsRead={handleMarkAsRead}
                    handleMarkAllAsRead={handleMarkAllAsRead}
                    notificationCounter={notificationCounter}
                  />

                </>
              ) :

                <Link href={'/login'} className='lg:hidden block'>
                  <button className='px-6 py-2.5 rounded-full bg-red text-white text-[18px] font-semibold'>Login / Register</button>
                </Link>
              }
          <FaBars onClick={handleShowSidebar} className='block lg:hidden' size={25} />
              </div>
          {/* sidebar */}
          <div className={`h-screen w-full max-w-sm ${showSidebar ? '-translate-x-0' : 'translate-x-full'} anim bg-white fixed top-0 right-0 transition-transform duration-300`}>
            <div className='w-full h-full flex flex-col items-start gap-5 px-4 py-6'>
              <div className='flex justify-between items-center w-full '>
                <h1 className='text-2xl font-bold'>Blood Bank</h1>
                <IoMdCloseCircle onClick={handleShowSidebar} className='' size={25} />
              </div>
              <Link href={'/'}>
                <button className='header-link font-semibold '>Home</button>
              </Link>
              <button className='header-link font-semibold '>Find Donor</button>
              <button className='header-link font-semibold '>Become a Donor</button>
              <button className='header-link font-semibold '>About Us</button>

              {isAuthenticated ? (
                <>
                  
              <Link href={'/request'}>
                <button className='header-link font-semibold '>Requests</button>
              </Link>
                  
                <button className='header-link font-semibold '>Profile</button>
                <button onClick={handleLogout} className='header-link font-semibold '>Logout</button>


                  
                </>
              ) :

                <Link href={'/login'}>
                  <button className='px-4 py-2 md:px-6 md:py-2.5 rounded-full bg-red text-white text-[18px] font-semibold'>Login / Register</button>
                </Link>
              }





            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Navbar
