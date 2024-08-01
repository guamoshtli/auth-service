const { Company } = require('../models');

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener empresas' });
  }
};

exports.getCompanyById = async (req, res) => {
  const { id } = req.params;
  try {
    const company = await Company.findByPk(id);
    if (!company) {
      return res.status(404).json({ error: 'Empresa no encontrada' });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener empresa' });
  }
};

exports.createCompany = async (req, res) => {
  const { name, address } = req.body;
  if (!name || !address) {
    return res.status(400).json({ error: 'El nombre y la dirección son requeridos' });
  }

  try {
    const newCompany = await Company.create({ name, address });
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear empresa' });
  }
};

exports.updateCompany = async (req, res) => {
  const { id } = req.params;
  const { name, address } = req.body;
  try {
    const company = await Company.findByPk(id);
    if (!company) {
      return res.status(404).json({ error: 'Empresa no encontrada' });
    }
    company.name = name || company.name;
    company.address = address || company.address;
    await company.save();
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar empresa' });
  }
};

exports.deleteCompany = async (req, res) => {
  const { id } = req.params;
  try {
    const company = await Company.findByPk(id);
    if (!company) {
      return res.status(404).json({ error: 'Empresa no encontrada' });
    }
    await company.destroy();
    res.json({ message: 'Empresa eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar empresa' });
  }
};
