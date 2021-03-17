// login action types
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_FAILS = 'LOGIN_USER_FAILS';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGOUT_USER = 'LOGOUT_USER';

//login
export const loginUserProcess = (user, history, baseUrl) => async (dispatch) => {
    console.log("start login", user)
    let responseData = {
        accessToken: null,
        refreshToken: null,
        loginMessage: "",
        isAuthenticated: false,
    }

    let headers = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    }

    console.log('headers', headers)
    await fetch(baseUrl + "api/token/", headers)
    .then(response => {
        if (response.status == 200) {
            return response.json();
        } else {
            let error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }).then(response => {
        history.push('/home')
        responseData.accessToken = response.access;
        responseData.refreshToken = response.refresh;
        responseData.loginMessage = "User logged successfully."
        responseData.isAuthenticated = true;
        console.log("then", responseData)
    })
    .catch((error) => {
        console.log(error)
        responseData.loginMessage = error.response;
        responseData.isAuthenticated = false;
    });
    console.log("data", responseData)
}

export const loginCredUser = (user, history, baseUrl) => (dispatch) => {
    const loginUser = loginUserProcess(user, history, baseUrl);
    console.log("login in actions", loginUser)
    if(loginUser.isAuthenticated){
        console.log("auth")
        localStorage.setItem('accessToken', loginUser.accessToken);
        localStorage.setItem('refreshToken', loginUser.refreshToken);
        dispatch(loginUserSuccess(user, loginUser.loginMessage));
        history.push("/home");
    } else {
        dispatch(loginUserFails(user, loginUser.loginMessage));
        history.push("/login-register");
    }
}

export const loginUserSuccess = (user, successMessage) => ({
    type: LOGIN_USER_SUCCESS,
    payload: user,
    message: successMessage,
})

export const loginUserFails = (user, failMessage) => ({
    type: LOGIN_USER_FAILS,
    payload: user,
    message: failMessage,
})

export const logoutUser = () => ({
    type: LOGOUT_USER,
})
