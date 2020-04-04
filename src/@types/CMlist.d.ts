/** @format */

declare module '*';

interface CMListProps {
	list: ListItem[]
	loading: boolean
	empty: boolean | string
	loadEnd: boolean
}

interface ListItem {
	img: string
	filesize: string
	name: string
	pid: string
	gid: string
	memo: string | null
	width?: number
	height?: number
}
