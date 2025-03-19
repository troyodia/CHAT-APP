export const BASE_URL =
  process.env.REACT_APP_URL_ENVIRONMENT === "dev"
    ? process.env.REACT_APP_LOCAL_BASE_URL
    : "";

//required for axios configuration of api routes without cookie authorization
export const BASE_URL_NOT_VALIDATED =
  process.env.REACT_APP_URL_ENVIRONMENT === "dev"
    ? process.env.REACT_APP_LOCAL_BASE_URL_NOT_VAILDATED
    : "";
//AUTH
export const AUTH_REFRESH_URL = `${BASE_URL_NOT_VALIDATED}/api/v1/auth/refresh`;
export const CREATE_PROFILE_URL = `${BASE_URL}/auth/profile`;
export const DELETE_PROFILE_IMAGE_URL = `${BASE_URL}/auth/delete-profile-image`;
export const LOGIN_USER_URL = `${BASE_URL_NOT_VALIDATED}/api/v1/auth/login`;
export const LOGOUT_USER_URL = `${BASE_URL}/auth/logout`;
export const REGISTER_USER_URL = `${BASE_URL_NOT_VALIDATED}/api/v1/auth/register`;
export const ADD_USER_PROFILE_IMAGE_URL = `${BASE_URL}/auth/add-profile-image`;
export const GET_ONLINE_STATUS_URL = `${BASE_URL}/auth/isOnline`;

//USER
export const GET_SINGLE_USER_URL = `${BASE_URL}/user/getSingleUser`;

//CONTACT LIST /CONTACT
export const CREATE_CONTACT_LIST_URL = `${BASE_URL}/contactList/createContactList`;
export const GET_CONTACT_LIST_URL = `${BASE_URL}/contactList/getContactList`;
export const SEARCH_CONTACT_LIST_URL = `${BASE_URL}/contact/searchContact`;
export const GET_BLOCKED_CONTACTS_URL = `${BASE_URL}/contact/getBlockedContacts`;
export const BLOCK_CONTACT_URL = `${BASE_URL}/contact/blockContact`;
export const UNBLOCK_CONTACT_URL = `${BASE_URL}/contact/unblockContact`;
export const CHECK_IF_BLOCKED_URL = `${BASE_URL}/contact/checkifBlocked`;
//MESSAGES
export const UPDATE_MESSAGE_READ_STATUS_URL = `${BASE_URL}/messages/updateReadStatus`;
export const GET_LAST_MESSAGE_URL = `${BASE_URL}/messages/getLastMessage`;
export const GET_UNREAD_MESSAGES_URL = `${BASE_URL}/messages/unreadMessages`;
export const GET_CHAT_MESSAGES = `${BASE_URL}/messages/getMessages`;
export const UPLOAD_AUDIO_FILE_URL = `${BASE_URL}/messages/uploadAudioFile`;
export const UPLOAD_FILE_URL = `${BASE_URL}/messages/uploadFile`;
export const DELETE_MESSAGE_FILE_URL = `${BASE_URL}/messages/deleteFile`;
export const GET_SIGNED_URL = `${BASE_URL}/messages/getSignedUrl`;
// IMAGES
export const AWS_BASE_FILE_PATH =
  "https://aws-s3-node-chatapp-upload-bucket.s3.us-east-1.amazonaws.com/uploads";
