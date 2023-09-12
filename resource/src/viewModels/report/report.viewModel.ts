import { AxiosError, AxiosResponse } from "axios";
import { plainToInstance } from "class-transformer";
import dayjs from "dayjs";
import { action, makeObservable, observable, runInAction } from "mobx";
import { ChangeEvent, MouseEvent } from "react";
import { DatePickerButtonType, ServerUrlType } from "../../../config/constants";
import LotDto from "../../dto/report/lot.dto";
import ProductDto from "../../dto/report/product.dto";
import ProductModel from "../../models/product/product.model";
import DefaultViewModel, { IDefaultProps } from "../default.viewModel";

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
      dataReset: action,
    });
  }

  dataReset = () => {
    runInAction(() => {
      this.products = [];
      this.productModel = new ProductModel();
      this.lotList = {};
      this.filterTarget = 0;
    });
  };

  InsertProductList = async () => {
    await this.api
      .post(ServerUrlType.BARO, "/product", this.productModel)
      .then((result: AxiosResponse<ProductDto[]>) => {
        const data = result.data;
        const instance = [];

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
        day: dayjs(date).format("YYYY-MM-DD"),
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
            day: dayjs(new Date()).format("YYYY-MM-DD"),
          };
        });
        break;
      case DatePickerButtonType.NEXT:
        const newTimeMs = new Date(this.productModel.day).getTime();
        const newNextDay = new Date(newTimeMs + 86400000);
        runInAction(() => {
          this.productModel = {
            ...this.productModel,
            day: dayjs(newNextDay).format("YYYY-MM-DD"),
          };
        });
        break;
      case DatePickerButtonType.PREV:
        const baseDateInMillis = new Date(this.productModel.day).getTime();
        const newPrevDay = new Date(baseDateInMillis - 86400000);
        runInAction(() => {
          this.productModel = {
            ...this.productModel,
            day: dayjs(newPrevDay).format("YYYY-MM-DD"),
          };
        });

        break;
    }
    this.InsertProductList();
  };

  handleChangeFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    runInAction(() => {
      this.filterTarget = +value;
    });
  };

  handleClickLotToggle = (event: MouseEvent<HTMLButtonElement>) => {
    const { index, key, id } = event.currentTarget.dataset;

    if (this.products[index].toggle === +key) return;

    const newProducts = [];
    for (let idx = 0; idx < this.products.length; idx++) {
      if (this.products[idx].machineNo === id) {
        newProducts[idx] = { ...this.products[idx], toggle: key };
        this.getLotData(
          this.productModel.day,
          this.products[idx].data[key].lot,
          this.products[idx].machineNo
        );
      } else {
        newProducts[idx] = this.products[idx];
      }
    }

    runInAction(() => {
      this.products = newProducts;
    });
  };

  handleClickFilter = (event: MouseEvent<HTMLSpanElement>) => {
    const { id } = event.currentTarget.dataset;

    runInAction(() => {
      this.filterTarget = +id;
    });
  };
}
