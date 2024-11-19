import { combineReducers } from "redux";
import userDataReducer from './userSlice'
import sendRequestReducer from './sendRequestSlice'
import donorDataReducer from './fetchDonorSlice'
import fetchRequestReducer from './fetchRequestsSlice'
import notificationsReducer from './markAsReadSlice'
import markAllAsReadReducer from './markAllAsReadSlice'
import acceptRequestReducer from './acceptRequestSlice'
import rejectRequestReducer from './rejectRequestSlice'
import chatReducer from './chatSlice'
import Reducer from './scrollDirectionSlice'
import scrollValueReducer from './scrollValueSlice'
export default combineReducers({
    userData:userDataReducer,
    sendRequest:sendRequestReducer,
    fetchDonor:donorDataReducer,
    requests:fetchRequestReducer,
    notifications:notificationsReducer,
    markAllAsRead:markAllAsReadReducer,
    acceptRequest:acceptRequestReducer,
    rejectRequest:rejectRequestReducer,
    chat:chatReducer,
    scroll:Reducer,
    scrollValue:scrollValueReducer

 
})


