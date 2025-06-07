class Authentication {
    constructor() {
        this.apiKey = import.meta.env.VITE_API_KEY;
        this.baseUrl = "https://identitytoolkit.googleapis.com/v1";
    }

    async createUser({ username, email, password }) {
        const res = await fetch(`${this.baseUrl}/accounts:signUp?key=${this.apiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error?.message);
        }

        try {
            await this.updateUsername({
                idToken: data.idToken,
                displayName: username
            });
        } catch (error) {
            await this.deleteUser({
                idToken: data.idToken
            });
            throw error;
        }
        
        return true;
    }

    async loginUser({ email, password }) {
        const res = await fetch(`${this.baseUrl}/accounts:signInWithPassword?key=${this.apiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        })

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error?.message);
        }

        this.setToken(data.idToken);

        return true;
    }

    async getUserData(idToken) {
        const res = await fetch(`${this.baseUrl}/accounts:lookup?key=${this.apiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idToken
            })
        })

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error?.message);
        }

        return data;
    }
 
    async updateUsername({ idToken, displayName }) {
        const res = await fetch(`${this.baseUrl}/accounts:update?key=${this.apiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idToken,
                displayName,
                returnSecureToken: false
            })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error?.message);
        }

        return true;
    }

    async deleteUser({ idToken }) {
        const res = await fetch(`${this.baseUrl}/accounts:delete?key=${this.apiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idToken
            })
        })

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error?.message);
        }

        return true;
    }

    logoutuser() {
        localStorage.removeItem("token");
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