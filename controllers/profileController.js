const db = require('../models');
const s = require('../middlewares/sendResponse');

const getProfile = async (req, res) => {
  console.log('Req.user:', req.user); // Verifica el contenido de req.user

  if (!req.user || !req.user.id) {
    return s.sendResponse(res, 400, { message: 'Usuario no autenticado o ID de usuario no proporcionado' });
  }

  const userId = req.user.id; // Usa req.user.id correctamente
  const roles = req.user.roles;

  console.log('UserId en profileController:', userId);

  try {
    // Busca la empresa asociada al usuario
    const userCompanies = await db.UserCompany.findOne({
      where: { userId: userId },
    });

    console.log('UserCompanies:', userCompanies); // Verifica el resultado de la consulta

    if (!userCompanies) {
      return s.sendResponse(res, 404, { message: 'Empresa no encontrada para el usuario' });
    }

    const companyId = userCompanies.companyId;

    // Devuelve la información del perfil
    res.json({ empresaId: companyId, roles: roles });

  } catch (error) {
    console.error('Error al obtener el perfil:', error);
    s.sendResponse(res, 500, { message: 'Error interno del servidor' });
  }
};

module.exports = { getProfile };