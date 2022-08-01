import {UserRoles} from "../../entities/UserRoles";

export interface CreateUserRequest {
	uid: string;
	firstName: string;
	lastName?: string | null;
	role: UserRoles;
}
