// import { authenticationService } from '../Services/authenticationService';
import { useContext } from 'react';
import { useSnackbar } from 'notistack';

import { AuthContext } from '../context/auth';

const useHandleResponse = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { logout } = useContext(AuthContext);

    const handleResponse = response => {
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if ([401, 403].indexOf(response.status) !== -1) {
                    logout();
                    enqueueSnackbar('User Unauthorized', {
                        variant: 'error',
                    });
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            return data;
        });
    };

    return handleResponse;
};

export default useHandleResponse;