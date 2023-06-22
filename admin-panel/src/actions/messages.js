// RETURN ERRORS
export const returnErrors = (msg, status) => {
    return {
      type: GET_ERRORS,
      payload: { msg, status }
    };
  };