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
//相关推荐
export const guessLike = (wallpaper_id) => {
	return getRequest(`/api/wallpapers/wallpaper/guess_you_like/`,{wallpaper_id})
}

