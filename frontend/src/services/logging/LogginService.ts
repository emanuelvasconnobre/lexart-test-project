import { ToastLevel } from "../../utils/typing/toast-level";
import { axiosRequest } from "../axiosRequest";
import { ProductDeletedModel } from "../protocols/model";
import { ServiceResponse } from "../protocols/service-response";
import { GetManyLogsParamsDto } from "./dtos";

const catchCallback = <T = any>(error: any) => {
  if (error instanceof Error) {
    return new ServiceResponse<T>({
      message: error.message,
      success: false,
      level: ToastLevel.ERROR,
    });
  }

  return new ServiceResponse<T>({
    success: false,
    message: "Unexpected Error",
    level: ToastLevel.ERROR,
  });
};

export class LoggingService {
  async getMany(dto: Partial<GetManyLogsParamsDto> = {}) {
    try {
      const { data: body } = await axiosRequest<{
        items: ProductDeletedModel[];
        countPage: number;
      }>({
        url: "/log",
        params: dto,
      });

      return new ServiceResponse<{
        items: ProductDeletedModel[];
        countPage: number;
      }>({
        message: body.message,
        data: body.data,
        success: true,
        level: ToastLevel.SUCCESS,
      });
    } catch (error: any) {
      return catchCallback<{ items: ProductDeletedModel[]; countPage: number }>(
        error
      );
    }
  }
}
