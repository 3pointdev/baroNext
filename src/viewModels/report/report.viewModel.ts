import { action, makeObservable, observable, runInAction } from "mobx";
import DefaultViewModel, { IDefaultProps } from "../default.viewModel";
import { AxiosError, AxiosResponse } from "axios";
import { plainToInstance } from "class-transformer";
import { DatePickerButtonType, ServerUrlType } from "../../../config/constants";
import moment from "moment";
import ProductModel from "../../models/product/product.model";
import { ChangeEvent, MouseEvent } from "react";
import ProductDto from "../../dto/report/product.dto";
import LotDto from "../../dto/report/lot.dto";

export interface ILotData {
  [key: string]: LotDto[];
}

export default class ReportViewModel extends DefaultViewModel {
  public products: ProductDto[] = [];
  public productModel: ProductModel = new ProductModel();
  public lotList: { [key: string]: ILotData };
  public filterTarget: number = 0;

  constructor(props: IDefaultProps) {
    super(props);

    makeObservable(this, {
      products: observable,
      productModel: observable,
      lotList: observable,
      filterTarget: observable,

      InsertProductList: action,
      getLotData: action,
      handleChangeDay: action,
      handleClickDay: action,
    });
  }

  InsertProductList = async () => {
    await this.api
      .post(ServerUrlType.BARO, "/product", this.productModel)
      .then((result: AxiosResponse<ProductDto[]>) => {
        const data = result.data;
        const instance = [];
        console.log(data);
        for (let index = 0; index < data.length; index++) {
          instance.push(plainToInstance(ProductDto, data[index]));
          this.getLotData(
            this.productModel.day,
            instance[index].data[0].lot,
            instance[index].machineNo
          );
        }
        runInAction(() => {
          this.products = instance.sort((a, b) => a.machineNo - b.machineNo);
        });
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        return false;
      });
  };

  getLotData = async (date: string, lotKey: number, machineNo: string) => {
    await this.api
      .get(ServerUrlType.BARO, `/product/${date}/${lotKey}`)
      .then((result: AxiosResponse<any[]>) => {
        const data = result.data;

        let lotArray = [];
        for (let index = 0; index < data.length; index++) {
          lotArray.push(plainToInstance(LotDto, data[index]));
        }

        const newLotObject = {
          ...this.lotList,
          [machineNo]: { [lotKey]: lotArray },
        };

        runInAction(() => {
          this.lotList = newLotObject;
        });
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        return false;
      });
  };

  handleChangeDay = (date: string) => {
    runInAction(() => {
      this.productModel = {
        ...this.productModel,
        day: moment(date).format("YYYY-MM-DD"),
      };
    });
    this.InsertProductList();
  };

  handleClickDay = (event: MouseEvent<HTMLButtonElement>) => {
    const { value } = event.currentTarget;

    switch (value) {
      case DatePickerButtonType.TODAY:
        runInAction(() => {
          this.productModel = {
            ...this.productModel,
            day: moment(new Date()).format("YYYY-MM-DD"),
          };
        });
        break;
      case DatePickerButtonType.NEXT:
        const newTimeMs = new Date(this.productModel.day).getTime();
        const newNextDay = new Date(newTimeMs + 86400000);
        runInAction(() => {
          this.productModel = {
            ...this.productModel,
            day: moment(newNextDay).format("YYYY-MM-DD"),
          };
        });
        break;
      case DatePickerButtonType.PREV:
        const baseDateInMillis = new Date(this.productModel.day).getTime();
        const newPrevDay = new Date(baseDateInMillis - 86400000);
        runInAction(() => {
          this.productModel = {
            ...this.productModel,
            day: moment(newPrevDay).format("YYYY-MM-DD"),
          };
        });

        break;
    }
    this.InsertProductList();
  };

  handleChangeFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    console.log(value);
    runInAction(() => {
      this.filterTarget = +value;
    });
  };

  handleClickLotToggle = (event: MouseEvent<HTMLButtonElement>) => {
    const { value, dataset } = event.currentTarget;

    const newProducts = [];
    for (let index = 0; index < this.products.length; index++) {
      if (this.products[index].machineNo === dataset.id) {
        newProducts[index] = { ...this.products[index], toggle: value };
        this.getLotData(
          this.productModel.day,
          this.products[index].data[value].lot,
          this.products[index].machineNo
        );
      } else {
        newProducts[index] = this.products[index];
      }
    }
    runInAction(() => {
      this.products = newProducts;
    });
  };
}
