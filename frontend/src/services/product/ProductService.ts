import { ToastLevel } from "../../utils/typing/toast-level";
import { axiosRequest } from "../axiosRequest";
import { ProductModel } from "../protocols/model";
import { ServiceResponse } from "../protocols/service-response";
import {
  CreateProductDto,
  GetManyProductsParamsDto,
  UpdateProductDto,
} from "./dtos";

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
    level: ToastLevel.ERROR,
  });
};

export class ProductService {
  async getById(id: string) {
    try {
      const { data: body } = await axiosRequest<ProductModel>({
        url: `/product/${id}`,
        method: "GET",
      });

      return new ServiceResponse<ProductModel>({
        message: body.message,
        data: body.data,
        success: true,
      });
    } catch (error: any) {
      return catchCallback<ProductModel>(error);
    }
  }

  async getMany(dto: Partial<GetManyProductsParamsDto> = {}) {
    try {
      const { data: body } = await axiosRequest<{
        items: ProductModel[];
        countPage: number;
      }>({
        url: "/product",
        params: dto,
      });

      return new ServiceResponse<{ items: ProductModel[]; countPage: number }>({
        message: body.message,
        data: body.data,
        success: true,
        level: ToastLevel.SUCCESS,
      });
    } catch (error: any) {
      return catchCallback<{ items: ProductModel[]; countPage: number }>(error);
    }
  }

  async create(dto: CreateProductDto) {
    try {
      const { data: body } = await axiosRequest<ProductModel>({
        url: "/product",
        method: "POST",
        data: dto,
      });

      return new ServiceResponse({
        message: body.message,
        data: body.data,
        success: true,
        level: ToastLevel.SUCCESS,
      });
    } catch (error: any) {
      return catchCallback<ProductModel>(error);
    }
  }

  async update(id: string, dto: Partial<UpdateProductDto>) {
    try {
      const { data: body } = await axiosRequest<ProductModel>({
        url: `/product/${id}`,
        method: "PUT",
        data: dto,
      });

      return new ServiceResponse<ProductModel>({
        message: body.message,
        data: body.data,
        success: true,
        level: ToastLevel.SUCCESS,
      });
    } catch (error: any) {
      return catchCallback<ProductModel>(error);
    }
  }

  async delete(id: string) {
    try {
      const { data: body } = await axiosRequest({
        url: `/product/${id}`,
        method: "DELETE",
      });

      return new ServiceResponse({
        message: body.message,
        data: body.data,
        success: true,
        level: ToastLevel.SUCCESS,
      });
    } catch (error: any) {
      return catchCallback(error);
    }
  }
}
