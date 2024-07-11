import { User } from "@data/entities";
import { UserModel } from "domain/models";
import { Optional } from "sequelize";
import { NullishPropertiesOf } from "sequelize/types/utils";

export class UserRepository {
  async getMany(take: number, skip: number) {
    const users = await User.findAll({
      limit: take,
      offset: skip,
    });
    return users;
  }

  async getById(id: string) {
    const user = await User.findByPk(id);
    return user;
  }

  async getByEmail(email: string) {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    return user;
  }

  async createOne(userData: UserModel) {
    const newUser = await User.create(
      userData as Optional<User, NullishPropertiesOf<User>>
    );
    return newUser;
  }

  async updateOne(id: number, userData: Partial<User>) {
    const updatedUser = await User.update(userData, {
      where: { id },
      returning: true,
    });
    return updatedUser[1][0];
  }

  async deleteOne(id: number) {
    const deletedUser = await User.destroy({
      where: { id },
    });

    return !!deletedUser;
  }
}
