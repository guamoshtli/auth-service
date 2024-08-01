const { Role } = require('../models');

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener roles' });
  }
};

exports.getRoleById = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener rol' });
  }
};

exports.createRole = async (req, res) => {
  const { name } = req.body;
  try {
    const newRole = await Role.create({ name });
    res.status(201).json(newRole);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear rol' });
  }
};

exports.updateRole = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }
    role.name = name || role.name;
    await role.save();
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar rol' });
  }
};

exports.deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }
    await role.destroy();
    res.json({ message: 'Rol eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar rol' });
  }
};
