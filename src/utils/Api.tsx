export const API_BASE_URL = 'https://apimatri.qurilo.com/api/v1/'
export const PROFILE_API_BASE_URL = 'https://bxcfrrl4-3000.inc1.devtunnels.ms'

export const AUTH = {
  SEND_lOGIN_REGISTER_OTP: `${API_BASE_URL}auth/sendOtp`,
  LOGING_WITH_OTP: `${API_BASE_URL}auth/login`,
  REGISTER_WITH_OTP: `${API_BASE_URL}auth/register`,
};

export const PROFILE = {
  UPDATE_PROFILE: `${PROFILE_API_BASE_URL}/auth/profile`,
  GET_USER_DATA: `${PROFILE_API_BASE_URL}/auth/user`,
};

export const MESSAGE = {
  ALL_USERS: '/api/message/allUserGet',
  SEND: '/api/message',
  getMessagesForUser: (currentUserId: string) => `/api/message?currentUserId=${encodeURIComponent(currentUserId)}`,
};