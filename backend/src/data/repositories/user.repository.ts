import { User } from "@data/entities";

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

  async createOne(userData: Omit<User, "id">) {
    const newUser = await User.create(userData);
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
