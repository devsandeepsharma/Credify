import axios from "axios";

class Database {
    constructor(path) {
        this.baseUrl = import.meta.env.VITE_BASE_URL;
        this.path = path;
    }

    async put (subPath, values) {
        const res = await axios.put(`${this.baseUrl}/${this.path}/${subPath}.json`, values);
        return res.data;
    }

    async patch (subPath, values) {
        const res = await axios.patch(`${this.baseUrl}/${this.path}/${subPath}.json`, values);
        return res.data;
    }

    async get (subPath) {
        const res = await axios.get(`${this.baseUrl}/${this.path}/${subPath}.json`);
        return res.data;
    }
}

export const UserService = new Database("users");
export const SlugService = new Database("slugs");
export const TestimonialService = new Database("testimonials");