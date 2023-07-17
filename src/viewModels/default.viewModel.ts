import { ApiModule } from "../modules/api.module";

interface IProps {}

export default class DefaultViewModel {
  protected api: ApiModule;
  constructor(props: IProps) {
    this.api = ApiModule.getInstance();
  }
}
