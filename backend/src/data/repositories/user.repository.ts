import { User } from "@data/entities";
import { UserModel } from "domain/models";
import { UnexpectedException } from "exceptions/app-exceptions";
import { Optional } from "sequelize";
import { NullishPropertiesOf } from "sequelize/types/utils";

export class UserRepository {
  async getMany(take: number, skip: number) {
    try {
      const users = await User.findAll({
        limit: take,
        offset: skip,
      });

      return users;
    } catch (error: any) {
      throw new UnexpectedException({
        message: `Error fetching users`,
        traceback: error.message,
      });
    }
  }

  async getById(id: string) {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (error: any) {
      throw new UnexpectedException({
        message: `Error fetching user by id`,
        traceback: error.message,
      });
    }
  }

  async getByEmail(email: string) {
    try {
      const user = await User.findOne({
        where: { email },
      });
      return user;
    } catch (error: any) {
      throw new UnexpectedException({
        message: `Error fetching user by email`,
        traceback: error.message,
      });
    }
  }

  async createOne(userData: UserModel) {
    try {
      const newUser = await User.create(
        userData as Optional<User, NullishPropertiesOf<User>>
      );
      return newUser;
    } catch (error: any) {
      throw new UnexpectedException({
        message: `Error creating user`,
        traceback: error.message,
      });
    }
  }

  async updateOne(id: number, userData: Partial<User>) {
    try {
      const updatedUser = await User.update(userData, {
        where: { id },
        returning: true,
      });
      return updatedUser[1][0];
    } catch (error: any) {
      throw new UnexpectedException({
        message: `Error updating user`,
        traceback: error.message,
      });
    }
  }

  async deleteOne(id: number) {
    try {
      const deletedUserCount = await User.destroy({
        where: { id },
      });
      return !!deletedUserCount;
    } catch (error: any) {
      throw new UnexpectedException({
        message: `Error deleting user`,
        traceback: error.message,
      });
    }
  }
}
