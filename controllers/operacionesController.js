// controllers/operacionesController.js
const OperacionesFinancieras = require('../models/operacionesFinancieras'); // Importa el modelo directamente
const { Op } = require('sequelize');
const sequelize = require('../config/database');
const s = require('../middlewares/sendResponse');

exports.getAllOperaciones = async (req, res) => {
  try {
    const operaciones = await OperacionesFinancieras.findAll();
    s.sendResponse(res, 200, operaciones);
  } catch (error) {
    console.error('Error al obtener todas las operaciones:', error);
    s.sendResponse(res, 500, { error: 'Error al obtener las operaciones financieras.' });
  }
};

exports.getOperacionesByEmpresa = async (req, res) => {
  try {
    const operaciones = await OperacionesFinancieras.findAll({
      where: { empresa_id: req.empresaId }, // Usamos el empresaId que se agregó en el middleware de autorización
    });
    s.sendResponse(res, 200, operaciones);
  } catch (error) {
    console.error('Error al obtener operaciones por empresa:', error);
    s.sendResponse(res, 500, { error: 'Error al obtener las operaciones financieras de la empresa.' });
  }
};

exports.getOperacionesFiltradas = async (req, res) => {
  try {
    const { tipo, fecha_inicio, fecha_fin, anio, estatus, genero, producto, estado, municipio, sucursal } = req.query;
    const whereClause = {};

    if (req.empresaId) { // Si no es administrador, filtrar por empresa
      whereClause.empresa_id = req.empresaId;
    }

    if (tipo) whereClause.tipo = tipo;
    if (fecha_inicio) whereClause.fecha = { [Op.gte]: fecha_inicio };
    if (fecha_fin) whereClause.fecha = { ...whereClause.fecha, [Op.lte]: fecha_fin };
    if (anio) whereClause.anio = anio;
    if (estatus) whereClause.estatus = estatus;
    if (genero) whereClause.genero = genero;
    if (producto) whereClause.producto = { [Op.like]: `%${producto}%` };
    if (estado) whereClause.estado = estado;
    if (municipio) whereClause.municipio = municipio;
    if (sucursal) whereClause.sucursal = sucursal;

    const operaciones = await OperacionesFinancieras.findAll({
      where: whereClause,
    });
    s.sendResponse(res, 200, operaciones);
  } catch (error) {
    console.error('Error al obtener operaciones filtradas:', error);
    s.sendResponse(res, 500, { error: 'Error al obtener las operaciones financieras filtradas.' });
  }
};

exports.getOperacionById = async (req, res) => {
  const { id } = req.params;
  const whereClause = { id };

  if (req.empresaId) {
    whereClause.empresa_id = req.empresaId;
  }

  try {
    const operacion = await OperacionesFinancieras.findOne({ where: whereClause });
    if (!operacion) {
      return s.sendResponse(res, 404, { error: 'Operación financiera no encontrada.' });
    }
    s.sendResponse(res, 200, operacion);
  } catch (error) {
    console.error('Error al obtener la operación por ID:', error);
    s.sendResponse(res, 500, { error: 'Error al obtener la operación financiera.' });
  }
};

exports.getDashboardData = async (req, res) => {
  try {
    const { empresaId } = req.query; // Obtén el empresaId de los parámetros de consulta
    const query = `
      SELECT ANIO, GENERO, SUM(operaciones) NUMOP, SUM(monto) MONTO
      FROM OperacionesFinancieras
      WHERE empresa_id = :empresaId AND tipo = 'CAPITAL'
      GROUP BY ANIO, GENERO;
    `;

    const results = await sequelize.query(query, {
      replacements: { empresaId: empresaId }, // Reemplaza :empresaId con el valor real
      type: sequelize.QueryTypes.SELECT, // Especifica el tipo de consulta
    });

    s.sendResponse(res, 200, results);
  } catch (error) {
    console.error('Error al obtener datos del dashboard:', error);
    s.sendResponse(res, 500, { error: 'Error al obtener datos del dashboard.' });
  }
};