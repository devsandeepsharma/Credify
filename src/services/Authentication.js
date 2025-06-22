import axios from "axios";
import { SlugService, UserService } from "./Database";
import { generateSlug } from "../utils/slug";

class Authentication {
    constructor() {
        this.apiKey = import.meta.env.VITE_API_KEY;
        this.baseUrl = "https://identitytoolkit.googleapis.com/v1";
    }

    async create ({ companyName, email, password }) {
        const res = await axios.post(`${this.baseUrl}/accounts:signUp?key=${this.apiKey}`, {
                email,
                password,
                returnSecureToken: true
            }
        ) 

        const slug = generateSlug(companyName);
        const localId = res.data.localId;
        const idToken = res.data.idToken;
        const userData = {
            companyName,
            companyLogo: "",
            companyDesc: "",
            localId,
            email,
            slug,
            hasPremium: false,
            template: 0
        }

        try {
            await UserService.put(localId, userData);
            await SlugService.put(slug, {localId});
        } catch (error) {
            await this.delete({idToken});
            throw error;
        }

        return true;
    }

    async delete (idToken) {
        await axios.post(`${this.baseUrl}/accounts:delete?key=${this.apiKey}`, idToken);

        return true;
    }

    async sendPasswordResetLink({email}) {
        await axios.post(`${this.baseUrl}/accounts:sendOobCode?key=${this.apiKey}`, {
            email,
            requestType: "PASSWORD_RESET"
        })

        return true;
    }

    async login ({email, password}) {
        const res = await axios.post(`${this.baseUrl}/accounts:signInWithPassword?key=${this.apiKey}`, {
            email,
            password,
            returnSecureToken: true
        })

        this.setToken(res.data.localId);

        return true;
    }

    checkCurrentUser(callback) {
        const handler = (e) => {
            callback(e.detail);
        };

        window.addEventListener("tokenChanged", handler);

        const token = localStorage.getItem("token");
        if (token) {
            callback(token);
        } else {
            callback(null);
        }

        return () => {
            window.removeEventListener("tokenChanged", handler);
        };
    }

    setToken(token) {
        localStorage.setItem("token", token);
        window.dispatchEvent(new CustomEvent("tokenChanged", { detail: token }));
    }

}

export const AuthService = new Authentication();