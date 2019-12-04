const initialState = {
    isAuthenticated: sessionStorage.isAuthenticated ? true : false,
    email: sessionStorage.isAuthenticated ? sessionStorage.email : '',
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'FLIP-STATUS':
            let newState = {
                ...state
            };
            newState.isAuthenticated = action.payload.isAuthenticated;
            newState.email = action.payload.email
            return newState;
        default:
            return state;
    }
};

export default reducer;