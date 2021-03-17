import * as ActionTypes from '../actions/loginActions';
import * as jwt from 'jsonwebtoken'

const getUserInfo = () => {
    let accessToken =localStorage.getItem('accessToken');
    if(accessToken === null){
        return {}
    } else {
        var decoded = jwt.decode(accessToken, {complete: true})
        return {
            isAuthenticated: true,
            userName: decoded.payload.name,
        }
    }
}
const initialState = {
    user: getUserInfo(),
    message: null,
    isAuthenticated: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGOUT_USER:
      return {...state};

    case ActionTypes.LOGIN_USER_SUCCESS:
      return {...state, user: action.payload, isAuthenticated: true, message: action.loginMessage};

    case ActionTypes.LOGIN_USER_FAILS:
      return {...state, user: action.payload, isAuthenticated: false, message: action.loginMessage};

    case ActionTypes.LOGOUT_USER:
        return {...state, user: null, isAuthenticated: false};

    default:
      return state;
  }
};

export default loginReducer;
