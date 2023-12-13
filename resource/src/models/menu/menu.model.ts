import SubMenuModel from "./subMenu.model";

export default class MenuModel {
  public name: string = "";
  public path: string = "";
  public title: string = "";
  public icon: () => React.JSX.Element = null;
  public size: number = 0;
  public subMenu: SubMenuModel[] = [];
}
