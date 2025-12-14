const storedUser = localStorage.getItem("user");
const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: !!localStorage.getItem("token"),
    user: storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null,
    loading: false,
    error: null,
    message: null,
    updatingProfile: false,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "AUTH_START":
            return { ...state, loading: true, error: null, message: null };

        case "AUTH_SUCCESS":
            return { ...state, loading: false, token: action.payload, isAuthenticated: true };

        case "AUTH_FAIL":
            return { ...state, loading: false, error: action.payload, message: null };

        case "SET_USER":
            localStorage.setItem("user", JSON.stringify(action.payload));
            return { ...state, user: action.payload };

        case "SET_AUTH_MESSAGE":
            return { ...state, message: action.payload };

        case "CLEAR_AUTH_MESSAGE":
            return { ...state, message: null };

        case "LOGOUT":
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            return {
                token: null,
                user: null,
                isAuthenticated: false,
                loading: false,
                error: null,
                message: null,
                updatingProfile: false,
            };

        case "UPDATE_PROFILE_START":
            return { ...state, updatingProfile: true, error: null, message: null };

        case "UPDATE_PROFILE_SUCCESS":
            localStorage.setItem("user", JSON.stringify(action.payload));
            return {
                ...state,
                updatingProfile: false,
                user: action.payload.user,
                message: "Profile updated successfully"
            };

        case "UPDATE_PROFILE_FAIL":
            return { ...state, updatingProfile: false, error: action.payload };

        default:
            return state;
    }
};
