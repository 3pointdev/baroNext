import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import SubMenuModel from "./subMenu.model";
import { faHome } from "@fortawesome/free-solid-svg-icons";

export default class MenuModel {
  public name: string = "";
  public path: string = "";
  public title: string = "";
  public icon: IconDefinition = faHome;
  public size: number = 0;
  public subMenu: SubMenuModel[] = [];
}
