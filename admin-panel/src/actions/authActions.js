export const login = (username, password) => {

    return async (dispatch) => {
      dispatch({ type: 'LOGIN_REQUEST' });
        
        
    
      try {
        const response = await loginUser(username, password);
  
        if (response.success) {
          // Successful login
          dispatch({ type: 'LOGIN_SUCCESS', payload: response.token });
        } else {
          // Failed login
          dispatch({ type: 'LOGIN_FAILURE', payload: response.error });
        }
      } catch (error) {
        // Handle API error
        dispatch({ type: 'LOGIN_FAILURE', payload: 'An error occurred during login' });
      }
    };
  };