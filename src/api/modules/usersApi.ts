import api from "@/api";
import { UserProfileResponse } from "@/types/users";

const usersApi = {
    getMe: () => api.get<UserProfileResponse>(`/users/me?populate[articles][populate][category]=*&populate[comments][populate][article]=*`),
};

export default usersApi;
