import Permissions from "./permissions.js";

const Roles = {
  ADMIN: [
    Permissions.READ_TEACHERS,
    Permissions.ADD_TEACHER,
    Permissions.EDIT_TEACHER,
    Permissions.DELETE_TEACHER,
    Permissions.READ_STUDENTS,
    Permissions.ADD_STUDENT,
    Permissions.EDIT_STUDENT,
    Permissions.DELETE_STUDENT,
    Permissions.READ_GROUPS,
    Permissions.ADD_GROUP,
    Permissions.EDIT_GROUP,
    Permissions.DELETE_GROUP,
    Permissions.READ_EMPLOYEES,
    Permissions.ADD_EMPLOYEE,
    Permissions.EDIT_EMPLOYEE,
    Permissions.DELETE_EMPLOYEE,
    Permissions.READ_ROOMS,
    Permissions.ADD_ROOM,
    Permissions.EDIT_ROOM,
    Permissions.DELETE_ROOM,
    Permissions.READ_FINANCES,
  ],
  TEACHER: [Permissions.READ_STUDENTS, Permissions.READ_GROUPS],
  STUDENT: [],
};

export default Roles;
