import { AxiosError, AxiosResponse } from "axios";
import { plainToInstance } from "class-transformer";
import dayjs from "dayjs";
import { action, makeObservable, observable, runInAction } from "mobx";
import { ChangeEvent, MouseEvent } from "react";
import { ServerUrlType } from "../../../config/constants";
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
  public filterTarget: number = 0;

  constructor(props: IDefaultProps) {
    super(props);

    makeObservable(this, {
      products: observable,
      productModel: observable,
      filterTarget: observable,
      InsertProductList: action,
      handleChangeDay: action,
      dataReset: action,
      setDate: action,
    });
  }

  dataReset = () => {
    runInAction(() => {
      this.products = [];
      this.productModel = new ProductModel();
      this.filterTarget = 0;
    });
  };

  setDate = () => {
    const yesterday = new Date();

    // 어제의 날짜를 가져옵니다.
    yesterday.setDate(yesterday.getDate() - 1);

    // 어제의 날짜가 주말인지 확인합니다.
    const day = yesterday.getDay();

    // 일요일일 경우
    if (day === 0) {
      runInAction(() => {
        this.productModel.day = dayjs(new Date())
          .subtract(3, "day")
          .format("YYYY-MM-DD");
      });
    }

    // 토요일일 경우
    if (day === 6) {
      runInAction(() => {
        this.productModel.day = dayjs(new Date())
          .subtract(2, "day")
          .format("YYYY-MM-DD");
      });
    }
  };

  InsertProductList = async () => {
    await this.api
      .get(ServerUrlType.BARO, `/report/getReport/${this.productModel.day}`)
      .then((result: AxiosResponse<ProductDto[]>) => {
        const data = result.data.map((item) =>
          plainToInstance(ProductDto, item)
        );

        runInAction(() => {
          this.products = data.sort((a, b) => a.mkey - b.mkey);
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

  handleChangeFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    runInAction(() => {
      this.filterTarget = +value;
    });
  };

  handleClickFilter = (event: MouseEvent<HTMLSpanElement>) => {
    const { id } = event.currentTarget.dataset;

    runInAction(() => {
      this.filterTarget = +id;
    });
  };
}
