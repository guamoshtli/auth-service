const { Company } = require('../models');
const s = require('../middlewares/sendResponse');

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    s.sendResponse(res, 200, companies);
  } catch (error) {
    s.sendResponse(res, 500, { error: 'Error al obtener empresas' });
  }
};

exports.getCompanyById = async (req, res) => {
  const { id } = req.params;
  try {
    const company = await Company.findByPk(id);
    if (!company) {
      return s.sendResponse(res, 404, { error: 'Empresa no encontrada' });
    }
    s.sendResponse(res, 200, company);
  } catch (error) {
    s.sendResponse(res, 500, { error: 'Error al obtener empresa' });
  }
};

exports.createCompany = async (req, res) => {
  const { name, address } = req.body;
  if (!name || !address) {
    return s.sendResponse(res, 400, { error: 'El nombre y la dirección son requeridos' });
  }

  try {
    const newCompany = await Company.create({ name, address });
    s.sendResponse(res, 201, newCompany);
  } catch (error) {
    s.sendResponse(res, 500, { error: 'Error al crear empresa' });
  }
};

exports.updateCompany = async (req, res) => {
  const { id } = req.params;
  const { name, address } = req.body;
  try {
    const company = await Company.findByPk(id);
    if (!company) {
      return s.sendResponse(res, 404, { error: 'Empresa no encontrada' });
    }
    company.name = name || company.name;
    company.address = address || company.address;
    await company.save();
    s.sendResponse(res, 200, company);
  } catch (error) {
    s.sendResponse(res, 500, { error: 'Error al actualizar empresa' });
  }
};

exports.deleteCompany = async (req, res) => {
  const { id } = req.params;
  try {
    const company = await Company.findByPk(id);
    if (!company) {
      return s.sendResponse(res, 404, { error: 'Empresa no encontrada' });
    }
    await company.destroy();
    s.sendResponse(res, 200, { message: 'Empresa eliminada' });
  } catch (error) {
    s.sendResponse(res, 500, { error: 'Error al eliminar empresa' });
  }
};
