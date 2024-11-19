import { API_URL, getAuthHeaders } from "@/Utils/apiUrl";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import io from 'socket.io-client';

const socket = io('http://localhost:5000');
  // Fetch User Data
  export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async ( _,{ rejectWithValue }) => {
      
      try {
      //   const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
        const response = await axios.get(`${API_URL}/user/getOneUser`, getAuthHeaders());
        return response.data.user; // The API response (leagues and teams)
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

    // Fetch User Data
    export const fetchDonors = createAsyncThunk(
      'user/fetchDonors',
      async ( _,{ rejectWithValue }) => {
        
        try {
        //   const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
          const response = await axios.get(`${API_URL}/user/get-users`, getAuthHeaders());
          return response.data; 
        } catch (error) {
          return rejectWithValue(error.response.data);
        }
      }
    );

    export const searchDonors  = createAsyncThunk(
      'user/searchDonors',
      async ( { city, bloodGroup },{ rejectWithValue }) => {
        
        try {
        //   const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
          const response = await axios.get(`${API_URL}/user/searchDonor?city=${city}&bloodGroup=${encodeURIComponent(bloodGroup)}`, getAuthHeaders());
          return response.data?.data; 
        } catch (error) {
          return rejectWithValue(error.response.data);
        }
      }
    );
  


  // Thunk for sending a friend request
export const sendRequest = createAsyncThunk(
    'user/sendRequest',
    async (recipientId, { rejectWithValue }) => {
      const authToken = localStorage.getItem('token');
      try {
        const response = await axios.post(
          `${API_URL}/user/sendRequest/${recipientId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const message = response.data.message;
  
        // Emit socket event for real-time update
        // socket.emit('newRequest', { recipientId, message: 'Request sent successfully' });
        return message;
      } catch (error) {
        return rejectWithValue(error.response ? error.response.data : 'Network Error');
      }
    }
  );
  

   // Thunk for sending a friend request
export const fetchRequest = createAsyncThunk(
  'user/fetchRequest',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/user/getRequests`,
        getAuthHeaders()
      );
      return response.data.requests;

      
      
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Network Error');
    }
  }
);

// mark read single notification
export const markRead = createAsyncThunk(
  'notifications/markRead',
  async (requestId, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/user/${requestId}/mark-read/`,{},
        {...getAuthHeaders()});
        console.log(response)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// mark read all notifications
export const markAllAsRead = createAsyncThunk(
  'notifications/markAllAsRead',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/user/mark-all-read/${userId}`,{},
        {...getAuthHeaders()});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);


// accept request
export const acceptRequest = createAsyncThunk(
  'request/acceptRequest',
  async (requestId, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/user/${requestId}/accept`,{},
        {...getAuthHeaders()});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);


// reject request
export const rejectRequest = createAsyncThunk(
  'request/rejectRequest',
  async (requestId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/user/${requestId}/reject`,
        {...getAuthHeaders()});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// fetch conversations
export const fetchConversations = createAsyncThunk(
  'chat/fetchConversations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/user/conversation`,
        {...getAuthHeaders()});
      return response.data.conversations;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// fetch messages for selected conversations
export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (conversationId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/user/${conversationId}/messages`,
        {...getAuthHeaders()});
      return response.data.messages;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);