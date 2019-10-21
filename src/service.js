import axios from 'axios';

const userRepoService = (username) => (
    axios.get(`https://api.github.com/users/${username}/repos`, {
    headers: {
        Accept: 'application/vnd.github.v3+json',
    }
    }).then(response => ({ data: response.data, status: response.status })).catch(error => ({ error })) 
);


export { userRepoService }