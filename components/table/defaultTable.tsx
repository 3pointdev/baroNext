interface IProps {
  header: string[];
  data: string[][];
}

export default function DefaultTable({ header, data }: IProps) {
  console.log(header, data);
  return <table></table>;
}
