import API from "./api";

const config = {
    service_id: "service_083asbp", // service ID
    user_id: "_No69B7DdE67vuTwZ", // Publick Key
}


export const sendMail = async (data) => {

    data = {
        ...config,
        template_id: "template_4rn8omk",
        template_params: { ...data }
    }

    try {
        const response = await API.post("https://api.emailjs.com/api/v1.0/email/send", data);
        return response.data;
    } catch (e) {
        throw e;
    }
};