import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

// import userReducer from './User/user.reducer';
import postReducer from './Post/posts.reducer';

export const rootReducer = combineReducers({
    // user: userReducer,
    post: postReducer
});

const configStorage = {
    key: 'root',
    storage,
};

export default persistReducer(configStorage, rootReducer);