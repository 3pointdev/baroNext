import UserDto from "../dto/user/user.dto";

class AuthModule {
  public saveStorage(user: UserDto) {
    console.log(user);
    window.localStorage.setItem("account", user.account);
    window.localStorage.setItem("token", user.token);
    window.localStorage.setItem("enterprise", user.enterprise);
    window.localStorage.setItem("enterprise_id", user.enterpriseId.toString());
    window.localStorage.setItem("name", user.name);
    window.localStorage.setItem("sender", user.sender);

    window.location.replace("/");
  }

  public destroyStorage() {
    window.localStorage.clear();
    window.location.replace("/login");
  }
}

export default new AuthModule();
