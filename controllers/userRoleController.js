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
  console.log('Request Params:', req.params); // Log para verificar los parámetros de la solicitud
  try {
    const roles = await UserRole.findAll({ where: { userId }, include: Role });
    console.log('Roles Encontrados:', roles); // Log para verificar los roles encontrados
    res.status(200).json(roles);
  } catch (error) {
    console.error('Error al obtener roles del usuario:', error); // Log para verificar errores
    res.status(500).json({ error: 'Error al obtener roles del usuario' });
  }
};
