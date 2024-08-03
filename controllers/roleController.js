const { Role } = require('../models');
const s = require('../middlewares/sendResponse');

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    s.sendResponse(res, 200, roles);
  } catch (error) {
    s.sendResponse(res, 500, { error: 'Error al obtener roles' });
  }
};

exports.getRoleById = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await Role.findByPk(id);
    if (!role) {
      return s.sendResponse(res, 404, { error: 'Rol no encontrado' });
    }
    s.sendResponse(res, 200, role);
  } catch (error) {
    s.sendResponse(res, 500, { error: 'Error al obtener rol' });
  }
};

exports.createRole = async (req, res) => {
  const { name } = req.body;
  try {
    const newRole = await Role.create({ name });
    s.sendResponse(res, 201, newRole);
  } catch (error) {
    s.sendResponse(res, 500, { error: 'Error al crear rol' });
  }
};

exports.updateRole = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const role = await Role.findByPk(id);
    if (!role) {
      return s.sendResponse(res, 404, { error: 'Rol no encontrado' });
    }
    role.name = name || role.name;
    await role.save();
    s.sendResponse(res, 200, role);
  } catch (error) {
    s.sendResponse(res, 500, { error: 'Error al actualizar rol' });
  }
};

exports.deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await Role.findByPk(id);
    if (!role) {
      return s.sendResponse(res, 404, { error: 'Rol no encontrado' });
    }
    await role.destroy();
    s.sendResponse(res, 200, { message: 'Rol eliminado' });
  } catch (error) {
    s.sendResponse(res, 500, { error: 'Error al eliminar rol' });
  }
};
