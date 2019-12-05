/** @format */

interface HomeStore {
	menus: MenusItem[]
	selectKey: string
	secondaryMenus: MenusItem[]
}

interface MenusItem {
	id: string
	name: string
	ispower: boolean
	sub: MenusItem[]
}
