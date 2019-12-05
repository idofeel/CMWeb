/** @format */

import request from "./request"

interface pageParams {
	selectKey: string
	secondaryKey: string
}
const queryString = (url: string) => {
	let param = url.split("?"),
		// type = (param[0] || '').split('://'),
		json = param.length > 0 ? parseUrl(param[1]) : {}

	return json
}

const parseUrl = (url: string) => {
	if (!url || url == null) return {}
	let queryArr = decodeURIComponent(url).split("&"),
		result: any = {}
	queryArr.forEach(function(item) {
		result[item.split("=")[0]] = item.split("=")[1]
	})
	return result
}

const urlEncoded = (data: any) => {
	if (typeof data === "string") return encodeURIComponent(data)
	let params = []
	for (let k in data) {
		if (!data.hasOwnProperty(k)) return
		let v = data[k]
		if (typeof v === "string") v = encodeURIComponent(v)
		if (v === undefined) v = ""
		params.push(`${encodeURIComponent(k)}=${v}`)
	}
	return params.join("&")
}

const joinUrlEncoded = (url: string, data: object) => {
	const params = urlEncoded(data)
	if (url.indexOf("?") < 0 && params) {
		url += "?" + params
	} else {
		url += "&" + params
	}
	return url
}

const replaceState = (urlSearch: string, payload: pageParams) => {
	let parmas = queryString(urlSearch)
	let param = location.href.split("?")
	parmas.m = payload.selectKey
	parmas.s = payload.secondaryKey
	window.history.replaceState({}, "0", joinUrlEncoded(param[0], parmas))
}

const domain = "http://fm.aijk.xyz"

/**
 *
 * @param url
 * @param data
 * @param showmsg
 */
const get = (url: string, data: object = {}, showmsg?: string) => {
	if (url.indexOf(domain) === -1) url = domain + url
	url = joinUrlEncoded(url, data)
	return request(
		url,
		{
			method: "GET",
			mode: "cors",
		},
		showmsg,
	)
}
/**
 *
 * @param {String} url
 * @param {Object} data
 */
const post = (url: string, data: object = {}, showmsg?: string) => {
	return request(
		url,
		{
			method: "POST",
			mode: "cors",
			body: JSON.stringify(data),
		},
		showmsg,
	)
}

export { joinUrlEncoded, parseUrl, urlEncoded, queryString, get, post, replaceState }
export default request