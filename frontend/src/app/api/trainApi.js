import axiosApi from './axiosApi';

const getDistance = (from, to) => {
    const currentUser = localStorage.getItem("user");
    console.log(currentUser)
    const body = {
        user: JSON.parse(currentUser),
        data: {
            origin: from,
            destination: to
        }
    }
    return axiosApi.post(`/trains/distance`, body);
};


const getTrains = (queryParams) => {
    if (queryParams) {
        return axiosApi.get(`/trains/?${queryParams}`);
    }
    return axiosApi.get(`/trains`);
};


const getTrain = (id) => {
    return axiosApi.get(`/trains/${id}`);
};

const createTrain = (values) => {
    const currentUser = localStorage.getItem("user");
    console.log(values)
    const body = {
        user: JSON.parse(currentUser),
        data: values
    }
    return axiosApi.post(`/trains`, body);
};

const deleteTrain = (trainNumber) => {
    return axiosApi.delete(`/trains/${trainNumber}`);
};

const trainApi = {
    getTrains,
    getTrain,
    getDistance,
    createTrain,
    deleteTrain
};

export default trainApi;
