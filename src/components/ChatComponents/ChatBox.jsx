'use client'
import { fetchConversations, fetchMessages } from '@/Store/Actions/userAction';
import { setSelectedConversation } from '@/Store/ReduxSlice/chatSlice';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Conversation from './Conversation';
import Messages from './Messages';
import axios from 'axios';
import { API_URL, getAuthHeaders } from '@/Utils/apiUrl'; import { io } from 'socket.io-client';


const socket = io('http://localhost:5000');
const ChatBox = () => {
  const dispatch = useDispatch();
  const { conversations, messages, selectedConversationId, participant1Id, participant2Id } = useSelector((state) => state.chat);
  // console.log(selectedConversationId)
  const { userData } = useSelector((state) => state.userData)
  const [message, setMessage] = useState("")
  const [showCons,setShowCons] = useState(false)
  // Emit userConnected with the user ID after logging in


  useEffect(() => {
    const userId = userData?._id; // Replace with the actual user ID
    socket.emit('joinRoom', userId);

    // Listen for new messages
    socket.on('newMessage', (data) => {
      console.log('New message received:', data);
      dispatch(fetchMessages(selectedConversationId));
      // You can update your Redux state or show a notification to the user here
    });

    return () => {
      console.log('Cleaning up socket listeners');
      socket.off('newMessage');
    };
  }, [dispatch,selectedConversationId])

  // Fetch conversations when component loads
  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  // Fetch messages when a conversation is selected
  useEffect(() => {
    if (selectedConversationId) {
      dispatch(fetchMessages(selectedConversationId));
    }
  }, [dispatch, selectedConversationId]);


  // console.log(participant2Id)
  // console.log(userData)
  const handleConversationClick = async (conversationId) => {
    await dispatch(setSelectedConversation(conversationId));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault()

    const conversationId = selectedConversationId
    const receiverId = userData?._id === participant1Id ? participant2Id : participant1Id

    try {

      const response = await axios.post(`${API_URL}/user/send`, { message, receiverId, conversationId }, getAuthHeaders());
      console.log(response)

      dispatch(fetchMessages(selectedConversationId));
      setMessage('')
    } catch (error) {
      console.log("something went wrong")
    }
  }

  const handleShowConversations = ()=>{
    setShowCons(!showCons)
  }
  return (
    <div className='w-full h-[calc(100vh-80px)] overflow-hidden mt-20'>
      <div className='h-full overflow-y-auto flex gap-4 py-4'>

        {/* Conversations List */}

        <Conversation
          conversations={conversations}
          selectedConversationId={selectedConversationId}
          handleConversationClick={handleConversationClick}
          userData={userData}
          showCons={showCons}
          handleShowConversations={handleShowConversations}
        />
        {/* Messages List */}
        <Messages
          messages={messages}
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
          userData={userData}
          message={message}
          selectedConversationId={selectedConversationId}
          showCons={showCons}
        />
      </div>
    </div>
  );
};

export default ChatBox;
