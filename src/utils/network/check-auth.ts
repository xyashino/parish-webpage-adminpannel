import { redirect } from "react-router-dom";
import { PageRouter } from "@enums/page-router.enum";
import { AxiosBase } from "@utils/network/axios-base";

export const checkAuth = async () => {
  try {
    await AxiosBase.get("users/current");
    return true;
  } catch (e) {
    return redirect(PageRouter.Login);
  }
};
