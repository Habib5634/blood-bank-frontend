'use client'
import { fetchDonors, searchDonors, sendRequest } from '@/Store/Actions/userAction'
import { clearSearch } from '@/Store/ReduxSlice/fetchDonorSlice'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'


const Donors = () => {
    const dispatch = useDispatch();
    const { donorData, isSearching, loadingDonorData,errorDonor } = useSelector((state) => state.fetchDonor);

    const [city, setCity] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');

    // Fetch all donors on initial load
    useEffect(() => {
        dispatch(fetchDonors());
    }, [dispatch]);

    // Handle search
    const handleSearch = (e) => {
        e.preventDefault();
        if (city || bloodGroup) {
            dispatch(searchDonors({ city, bloodGroup }));
        }
        if(errorDonor){
            toast.error("No Donor available ")
        }
    };

    // Clear search results
    const handleClearSearch = () => {
        dispatch(clearSearch());
        dispatch(fetchDonors());
        setCity('');
        setBloodGroup('');
    };

    const handleSendRequest = async (recipientId) => {
        try {
          await dispatch(sendRequest(recipientId)).unwrap(); // `unwrap` to handle rejection
          toast.success("Request Sent Successfully")
        } catch (error) {
          console.log('Failed to send request:', error);
        }
      };

    return (
        <div className='flex flex-col  px-6 md:px-10 lg:px-16 2xl:px-0 py-8 md:py-16 lg:py-20 mx-auto w-full max-w-[1440px]'>

            <h1 className='text-[50px] md:text-[60px] lg:text-[70px] leading-none font-bold  text-red  mb-10 md:mb-16 text-center'>Our Donors</h1>

            <form className='flex gap-6 flex-wrap' onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className='px-6 py-2.5 rounded-full border'
                />
                <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className='px-6 py-2.5 rounded-full border'
                >
                    <option value="" disabled>Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                </select>

                <button type='submit' className='px-6 py-2.5 rounded-full text-white font-semibold bg-red'>Search Donor</button>
                {isSearching && (
                    <button
                        type="button"
                        onClick={handleClearSearch}
                        className='px-6 py-2.5 rounded-full text-white font-semibold bg-gray-500 ml-4'
                    >
                        Clear Search
                    </button>
                )}
            </form>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full mt-6 md:mt-10'>
                {donorData && donorData.length > 0 ? (
                    donorData.map((donor, index) => (
                        <div className='p-2 md:p-4 rounded-2xl border border-red h-full' key={index}>
                            <img src={donor?.profile} alt={donor.userName} className='w-full h-full rounded-2xl object-cover max-h-[250px]' />
                            <h1 className='text-xl text-nowrap overflow-hidden text-ellipsis my-2 font-medium'>{donor.firstName} {donor.lastName}</h1>
                            <h3 className='mb-2'>Blood Group: <span className='font-bold'>{donor?.bloodGroup}</span></h3>
                            <div className='flex gap-4'>
                                <button onClick={() => handleSendRequest(donor._id)} className='py-1 px-4 border border-red hover:bg-red hover:text-white anim3 rounded-xl text-lg'>Request</button>
                                <button  className='py-1 px-4 border border-red hover:bg-red hover:text-white anim3 rounded-xl text-lg'>Chat</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1 className='text-xl font-medium col-span-full text-center'>No Donors Available</h1>
                )}
            </div>
           

        </div>
    )
}

export default Donors
