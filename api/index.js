import { postRequest, getRequest } from "@/utils/http.js";


// export const getlist = (params) => {
// 	return postRequest('/poster/',params)
// }



export const getWallpapersList = (params) => {
	return getRequest(`/api/wallpapers/wallpaper/`,params)
}

export const getWallpapersTags = (params) => {
	return getRequest(`/api/wallpapers/navigation_tag/`,params)
}
