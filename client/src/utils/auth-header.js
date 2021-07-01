const token = localStorage.getItem('linkedinToken') || '';

function authHeader() {
    

    if (token) {
        return {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
    } else {
        return {};
    }
}

export default authHeader;