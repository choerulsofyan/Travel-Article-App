import React, { useState } from "react";
import uploadApi from "@/api/modules/uploadApi";
import { Image } from "@/types/upload";

interface ImageUploadProps {
    onImageUpload: (image: Image) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await uploadApi.uploadImage(file);
            const uploadedImage = response.data[0];

            onImageUpload(uploadedImage);
        } catch (err: any) {
            setError(err.response?.data?.error?.message || "Failed to upload image");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {loading && <div>Uploading...</div>}
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default ImageUpload;
