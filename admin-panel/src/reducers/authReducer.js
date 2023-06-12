const initialState = {
    loading: false,
    token: null,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    
    switch (action.type) {
      case 'LOGIN_REQUEST':
        // return { ...state, loading: true, error: null };
        alert('sdfsd')
      case 'LOGIN_SUCCESS':
        return { ...state, loading: false, token: action.payload, error: null };
      case 'LOGIN_FAILURE':
        return { ...state, loading: false, token: null, error: action.payload };
      default:
        return state;
    }
  };
  
  export default authReducer;