import axios from "axios";

class Storage {
    constructor( ) {
        this.cloudName = import.meta.env.VITE_CLOUD_NAME;
        this.uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;
    }

    async uploadImage(file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", this.uploadPreset);

        const res = await axios.post(`https://api.cloudinary.com/v1_1/${this.cloudName}/upload`, formData);
    
        return res.data.secure_url;
    }
}

export const StorageService = new Storage();