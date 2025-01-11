// src/api/modules/usersApi.ts
import api from "@/api";
import { UserProfileResponse } from "@/types/users"; // We'll define this type in the next step

const usersApi = {
    getMe: () => api.get<UserProfileResponse>(`/users/me?populate[articles][populate][category]=*&populate[comments][populate][article]=*`),
};

export default usersApi;
