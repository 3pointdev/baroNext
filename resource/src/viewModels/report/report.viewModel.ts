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
    // 더미데이터
    // this.products = [
    //   plainToInstance(ProductDto, {
    //     data: [
    //       {
    //         avg_active: 1000,
    //         avg_idle: 1000,
    //         count: 1000,
    //         lot: 1000,
    //         plan: 1000,
    //         setting_time: 1000,
    //         std_active: 1000,
    //       },
    //     ],
    //     mid: "MID",
    //     mkey: 0,
    //     start_time: "08:30",
    //     end_time: "17:30",
    //     total_time: 1000,
    //     work_time: 1000,
    //     brk_time: 1000,
    //     eat_time: 1000,
    //   }),
    // ];
    makeObservable(this, {
      products: observable,
      productModel: observable,
      filterTarget: observable,
      InsertProductList: action,
      handleChangeDay: action,
      dataReset: action,
    });
  }

  dataReset = () => {
    runInAction(() => {
      this.products = [];
      this.productModel = new ProductModel();
      this.filterTarget = 0;
    });
  };

  InsertProductList = async () => {
    await this.api
      .get(ServerUrlType.BARO, `/report/${this.productModel.day}`)
      .then((result: AxiosResponse<ProductDto[]>) => {
        if (result.data.length <= 0) {
          runInAction(() => {
            this.productModel = {
              ...this.productModel,
              day: dayjs(this.productModel.day)
                .subtract(1, "day")
                .format("YYYY-MM-DD"),
            };
          });
          this.InsertProductList();
        }

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
