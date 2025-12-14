import API from "../../apis";

export const authStart = () => ({ type: "AUTH_START" });
export const authSuccess = (token) => ({ type: "AUTH_SUCCESS", payload: token });
export const authFail = (error) => ({ type: "AUTH_FAIL", payload: error });
export const authSuccessMsg = (message) => ({ type: "SET_AUTH_MESSAGE", payload: message });
export const setUser = (user) => ({ type: "SET_USER", payload: user });

export const updateProfileStart = () => ({ type: "UPDATE_PROFILE_START" });
export const updateProfileSuccess = (user) => ({ type: "UPDATE_PROFILE_SUCCESS", payload: user });
export const updateProfileFail = (error) => ({ type: "UPDATE_PROFILE_FAIL", payload: error });


export const registerUser = (userData) => async (dispatch) => {
    dispatch(authStart());
    try {
        const data  = await API.post("/register", userData);
        localStorage.setItem("token", data.data.token);
        dispatch(authSuccess(data.data.token));
        const profile = await API.get("/profile");
        dispatch(setUser(profile.data));
        if (data.data.message) {
            dispatch(authSuccessMsg(data.data.message));
            return data.data.message;
        }
    } catch (err) {
        dispatch(authFail(err.response?.data?.message || "Registration failed"));
    }
};

export const loginUser = (userData) => async (dispatch) => {
    dispatch(authStart());
    try {
        const  data  = await API.post("/login", userData);
        localStorage.setItem("token", data.data.token);
        dispatch(authSuccess(data.data.token));
        const profile = await API.get("/profile");
        dispatch(setUser(profile.data));
        if (data.data.message) {
            dispatch(authSuccessMsg(data.data.message));
            return data.data.message;
        }
    } catch (err) {
        dispatch(authFail(err.response?.data?.message || "Login failed"));
    }
};

export const fetchProfile = () => async (dispatch) => {
    dispatch(authStart());
    try {
        const { data } = await API.get("/profile");
        dispatch(setUser(data));
    } catch (err) {
        dispatch(authFail("Failed to fetch profile"));
    }
};
export const updateProfile = (userData) => async (dispatch, getState) => {
    dispatch(updateProfileStart());

    try {
        const { auth: { token } } = getState();
        const { data } = await API.put("/profile", userData, {
            headers: { Authorization: `Bearer ${token}` },
        });

        dispatch(updateProfileSuccess(data));
        if (data.message) {
            dispatch(authSuccessMsg(data.message));
            return data.message;
        }
    } catch (error) {
        dispatch(authFail(error.response?.data?.message || "Registration failed"));
    }
};
export const logout = () => (dispatch) => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
};
