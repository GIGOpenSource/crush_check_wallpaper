import { postRequest, getRequest } from "@/utils/http.js";


// export const getlist = (params) => {
// 	return postRequest('/poster/',params)
// }



export const getWallpapersList = (params) => {
	return getRequest(`/wallpapers/wallpaper/`,params)
}
