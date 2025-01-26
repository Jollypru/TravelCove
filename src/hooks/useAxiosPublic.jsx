import axios from 'axios';

const AxiosPublic = axios.create({
    baseURL: 'https://assignment-12-server-tau-seven.vercel.app'
})
const useAxiosPublic = () => {
    return AxiosPublic;
};

export default useAxiosPublic;