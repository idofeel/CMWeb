declare type MenuMode =
  | "vertical"
  | "vertical-left"
  | "vertical-right"
  | "horizontal"
  | "inline";

interface Props {
  menus: Menus[];
  dispatch: any;
  mode: MenuMode;
}
interface State {}
interface Menus {
  id: string;
  name: string;
  ispower: boolean;
  sub: Menus[];
}
