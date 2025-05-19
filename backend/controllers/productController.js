const db = require('../db');

exports.getProducts = (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.sendStatus(500);
    res.json(results);
  });
};
