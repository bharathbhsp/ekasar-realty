import type { Role } from "@/types";

const ROLE_RANK: Record<Role, number> = {
  USER: 1,
  EDITOR: 2,
  ADMIN: 3,
};

export function hasMinRole(userRole: Role, required: Role): boolean {
  return ROLE_RANK[userRole] >= ROLE_RANK[required];
}

export function canEditPost(
  userRole: Role,
  userId: string,
  authorId: string
): boolean {
  if (userRole === "ADMIN") return true;
  if (userRole === "EDITOR" && userId === authorId) return true;
  return false;
}

export function canPublish(userRole: Role): boolean {
  return hasMinRole(userRole, "EDITOR");
}

export function canManageUsers(userRole: Role): boolean {
  return userRole === "ADMIN";
}
