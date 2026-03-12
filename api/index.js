import { postRequest, getRequest } from "@/utils/http.js";


// export const getlist = (params) => {
// 	return postRequest('/poster/',params)
// }


//壁纸列表
export const getWallpapersList = (params) => {
	return getRequest(`/api/wallpapers/wallpaper/`,params)
}
//标签
export const getWallpapersTags = (params) => {
	return getRequest(`/api/wallpapers/navigation_tag/`,params)
}

