import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from "src/shared/interfaces/user.interface";
import { UsersRepository } from "./users.repository";
import { getResponseMessage } from "../../shared/constants/messages.constant";
import { Role, RoleType } from "../../shared/interfaces/role.interface";

@Injectable()
export class UsersService {
  constructor(private userRepo: UsersRepository) {}

  getProfile(user: User) {
    const myUser = user;
    delete myUser.password;
    return myUser;
  }

  async updateRole(userId: number, role: string) {
    try {
      const hasRole: RoleType | null = Role[role];
      if (!hasRole)
        throw new BadRequestException(getResponseMessage("INVALID_ROLE"));

      try {
        await this.userRepo.update(userId, {
          role: hasRole,
        });
        return hasRole;
      } catch (e) {
        throw new BadRequestException(getResponseMessage("INVALID_USER_ID"));
      }
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    try {
        const users = await this.userRepo.findAll(); 
        return users.map(user => {
            const myUser = { ...user };
            delete myUser.password; 
            return myUser;
        });
    } catch (error) {
        throw new BadRequestException(getResponseMessage("ERROR_FETCHING_USERS"));
    }
}
async deleteUser(userId: number): Promise<void> {
  try {
    await this.userRepo.deleteOneWithId(userId);
  } catch (error) {
    throw new BadRequestException(getResponseMessage("INVALID_USER_ID"));
  }
}
}
