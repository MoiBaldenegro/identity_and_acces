import { AggregateRoot } from 'src/modules/common/AggregateRoot';
import { UserId } from '../vo/UserId';
import { Username } from '../vo/Username';
import { Email } from '../vo/Email.vo';
import { createUserDTO } from '../dtos/createUser.dto';
import { UserBuilder } from '../builder/UserBuilder';
import { UserRole } from './UserRole.entity';
import { UserDto } from '../dtos/user.dto';
import { UserCreated } from '../event/UserCreated.event';

export class User extends AggregateRoot {
  userId!: UserId;
  username: Username;
  email: Email;
  confirmed: boolean;
  roles: UserRole[];

  public static create(userData: createUserDTO): User {
    const user = new UserBuilder()
      .setUserId(UserId.generate())
      .setUsername(userData.username)
      .setEmail(userData.email)
      .setRoles(
        userData.roles
          ? userData.roles.map((role) => UserRole.create(role))
          : [],
      )
      .build();
    user.record(new UserCreated(user));
    return user;
  }

  public confirm(): void {
    if (this.confirmed) {
      return;
    }
    this.confirmed = true;
    // this.addDomainEvent(new UserConfirmedEvent(this.id.value));
  }

  public toPrimitives(): UserDto {
    return {
      userId: this.userId.getValue(),
      username: this.username.getValue(),
      email: this.email.getValue(),
      confirmed: this.confirmed,
      roles: this.roles.map((role) => ({
        name: role.name.getValue(),
        modules: role.modules.map((m) => ({
          name: m.name.getValue(),
          permissions: m.permissions,
        })),
      })),
    };
  }
}
