const initialState = {
    loading: false,
    token: null,
    error: null,
    isLoggedIn: false
  };
  
  const authReducer = (state = initialState, action) => {
    
    switch (action.type) {
      case 'LOGIN_REQUEST':
        return { ...state, loading: true, error: null  };
      case 'LOGIN_SUCCESS':
        return { ...state, loading: false, token: action.payload, error: null, isLoggedIn: true };
      case 'LOGIN_FAIL':
        return { ...state, loading: false, token: null, error: action.payload, isLoggedIn:false };
      default:
        return state;
    }
  };
  
  export default authReducer;