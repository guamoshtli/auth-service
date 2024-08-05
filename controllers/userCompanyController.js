const { UserCompany, User, Company } = require('../models');
const s = require('../middlewares/sendResponse');

exports.addUserCompany = async (req, res) => {
  const { userId, companyId } = req.body;
  console.log(req.body);
  try {
    const userCompany = await UserCompany.create({ userId, companyId });
    s.sendResponse(res, 201, userCompany);
  } catch (error) {
    s.sendResponse(res, 500, { error: 'Error al asignar empresa al usuario' });
  }
};

exports.getUserCompanies = async (req, res) => {
  const { userId } = req.params;
  try {
    const companies = await UserCompany.findAll({ where: { userId }, include: Company });
    s.sendResponse(res, 200, companies);
  } catch (error) {
    s.sendResponse(res, 500, { error: 'Error al obtener empresas del usuario' });
  }
};

exports.deleteUserCompanies = async (req, res) => {
  const { userId } = req.params;
  try {
    const companies = await UserCompany.destroy({ where: { userId }, include: Company });
    s.sendResponse(res, 200, companies);
  } catch (error) {
    s.sendResponse(res, 500, { error: 'Error al obtener empresas del usuario' });
  }
};

exports.getAllUserCompanies = async (req, res) => {
  const { userId } = req.params;
  try {
    const companies = await UserCompany.findAll();
    s.sendResponse(res, 200, companies);
  } catch (error) {
    s.sendResponse(res, 500, { error: 'Error al obtener las empresas ' });
  }
};
