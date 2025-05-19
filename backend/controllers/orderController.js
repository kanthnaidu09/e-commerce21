const db = require('../db');

exports.placeOrder = (req, res) => {
  const { items, total } = req.body;
  const orderQuery = 'INSERT INTO orders (total) VALUES (?)';
  db.query(orderQuery, [total], (err, result) => {
    if (err) return res.sendStatus(500);
    const orderId = result.insertId;
    const values = items.map(i => [orderId, i.id, i.qty]);
    const itemQuery = 'INSERT INTO order_items (order_id, product_id, quantity) VALUES ?';
    db.query(itemQuery, [values], (err) => {
      if (err) return res.sendStatus(500);
      res.sendStatus(200);
    });
  });
};
