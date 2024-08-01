const { UserCompany, User, Company } = require('../models');

exports.addUserCompany = async (req, res) => {
  const { userId, companyId } = req.body;
  try {
    const userCompany = await UserCompany.create({ userId, companyId });
    res.status(201).json(userCompany);
  } catch (error) {
    res.status(500).json({ error: 'Error al asignar empresa al usuario' });
  }
};

exports.getUserCompanies = async (req, res) => {
  const { userId } = req.params;
  try {
    const companies = await UserCompany.findAll({ where: { userId }, include: Company });
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener empresas del usuario' });
  }
};
