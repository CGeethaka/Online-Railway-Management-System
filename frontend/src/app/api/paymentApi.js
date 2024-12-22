import axiosApi from './axiosApi';

const getConfig = () => {
    return axiosApi.get(`/payment/config`);
};

const createPayementIntent = () => {
    return axiosApi.post(`/payment/create-payment-intent`, JSON.stringify({}));
};

const paymentApi = {
    getConfig,
    createPayementIntent,
};

export default paymentApi;

