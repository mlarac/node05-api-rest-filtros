const express = require('express');
const format = require('pg-format');
const pool = require('../coneccionbd');

const router = express.Router();

// Función auxiliar para generar enlaces HATEOAS
const generateHATEOAS = (joyas) => {
  return joyas.map((joya) => ({
    name: joya.nombre,
    href: `/joyas/${joya.id}`,
    id: joya.id
  }));
};

// GET /joyas
router.get('/', async (req, res) => {
  try {
    let { limits = 10, page = 1, order_by = "id_ASC" } = req.query;
    const offset = (page - 1) * limits;

    // Validar y ajustar los parámetros
    limits = parseInt(limits);
    page = parseInt(page);
    if (isNaN(limits) || isNaN(page) || limits <= 0 || page <= 0) {
      return res.status(400).json({ error: "Parámetros de paginación inválidos" });
    }

    // Preparar la consulta SQL
    let query = 'SELECT * FROM inventario';
    const orderParams = order_by.split('_');
    if (orderParams.length === 2) {
      query += format(' ORDER BY %I %s', orderParams[0], orderParams[1]);
    }
    query += ` LIMIT ${limits} OFFSET ${offset}`;

    const result = await pool.query(query);
    const joyas = generateHATEOAS(result.rows);

    // Contar el total de joyas para la paginación
    const totalCount = await pool.query('SELECT COUNT(*) FROM inventario');
    const total = parseInt(totalCount.rows[0].count);

    res.json({
      total: total,
      limit: limits,
      page: page,
      totalPages: Math.ceil(total / limits),
      results: joyas
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// GET /joyas/filtros
router.get('/filtros', async (req, res) => {
    try {
      const { precio_max, precio_min, categoria, metal } = req.query;
      let query = 'SELECT * FROM inventario WHERE 1=1';
      const values = [];
      let paramCount = 1;
  
      if (precio_min) {
        query += ` AND precio >= $${paramCount}`;
        values.push(precio_min);
        paramCount++;
      }
      if (precio_max) {
        query += ` AND precio <= $${paramCount}`;
        values.push(precio_max);
        paramCount++;
      }
      if (categoria) {
        query += ` AND categoria = $${paramCount}`;
        values.push(categoria);
        paramCount++;
      }
      if (metal) {
        query += ` AND metal = $${paramCount}`;
        values.push(metal);
        paramCount++;
      }
  
      const result = await pool.query(query, values);
      const joyas = generateHATEOAS(result.rows);
  
      res.json({
        total: joyas.length,
        results: joyas
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });

module.exports = router;