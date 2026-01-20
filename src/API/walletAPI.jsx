import API from "./instance";

export const getWallet = async () => {
    try {
        const response = await API.get("/wallet/");
        return response.data;
    } catch (error) {
        console.error("Error fetching wallet:", error);
        throw error.response?.data || error.message;
    }
};
