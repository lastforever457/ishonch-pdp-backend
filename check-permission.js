import Roles from "./roles.js";

const checkPermission = (requiredPermission) => (req, res, next) => {
  const userRole = req.user.role;
  const userPermissions = Roles[userRole];

  if (userPermissions && userPermissions.includes(requiredPermission)) {
    return next();
  }

  return res.status(403).json({ message: "Access denied" });
};

export default checkPermission;
