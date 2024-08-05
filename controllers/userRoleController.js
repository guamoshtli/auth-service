const { UserRole, User, Role } = require('../models');

exports.addUserRole = async (req, res) => {
  const { userId, roleId } = req.body;
  try {
    const userRole = await UserRole.create({ userId, roleId });
    res.status(201).json(userRole);
  } catch (error) {
    res.status(500).json({ error: 'Error al asignar rol al usuario' });
  }
};


exports.getUserRoles = async (req, res) => {
  const { userId } = req.params;
  try {
    const roles = await UserRole.findAll({ where: { userId }, include: Role });
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener roles del usuario' });
  }
};

exports.deleteUserRoles = async (req, res) => {
  const { userId } = req.params;
  try {
    const roles = await UserRole.destroy({ where: { userId }, include: Role });
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Error al borrar roles del usuario' });
  }
};

exports.getAllUserRoles = async (req, res) => {
    try {
    const roles = await UserRole.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los roles ' });
  }
};
