import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import SubMenuModel from "./subMenu.model";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { ReactElement } from "react";

export default class MenuModel {
  public name: string = "";
  public path: string = "";
  public title: string = "";
  public icon: () => React.JSX.Element = null;
  public size: number = 0;
  public subMenu: SubMenuModel[] = [];
}
