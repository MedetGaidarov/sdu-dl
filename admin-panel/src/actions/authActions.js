import axios from "axios";
import { LOGIN_FAIL, LOGIN_SUCCESS } from "./types";

export const login = (loginRequest) => dispatch => {

  
  const config = {
      headers: {
          "Content-Type": "application/json"
      }
  };

  const body = JSON.stringify(loginRequest);

  axios
      .post("http://localhost:5000/api/auth/signin", body, config)
      .then(res => {
          console.log('Successfull logged in!')
          dispatch({type: LOGIN_SUCCESS, payload: res.data});
      })
      .catch(err => {

          console.log('Something goes wrong!', err)       
             dispatch({type: LOGIN_FAIL});
      });
}