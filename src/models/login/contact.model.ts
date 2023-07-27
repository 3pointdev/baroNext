export default class FindAccountModel {
  public company: string = "";
  public contact: string = "";
  public inquiry: string = "";
  public inquiry_type: any[] = [
    { text: "아이디 문의", value: "id" },
    { text: "비밀번호 문의", value: "password" },
  ];
  public sender: string = "";
}
