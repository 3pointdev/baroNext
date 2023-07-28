import styled from "styled-components";
import ProductDto from "../../src/dto/report/product.dto";
import ProductDataDto from "../../src/dto/report/productData.dto";
import LotDto from "../../src/dto/report/lot.dto";
import { ILotData } from "../../src/viewModels/report/report.viewModel";

interface IProps {
  data: ProductDto;
  lot: ILotData;
}

export default function ReportData({ data, lot }: IProps) {
  return <Container></Container>;
}

const Container = styled.div``;
