/** @format */

interface CMList {
	list: List[]
}

interface List {
	img: string
	filesize: string
	name: string
	pid: string
	gid: string
	memo: string | null
}
