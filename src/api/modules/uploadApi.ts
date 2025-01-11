import api from "@/api";
import { UploadResponse } from "@/types/upload";

const uploadApi = {
    uploadImage: (file: File) => {
        const formData = new FormData();
        formData.append("files", file);

        return api.post<UploadResponse>("/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
};

export default uploadApi;
