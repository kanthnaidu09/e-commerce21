const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret'; // Replace with environment variable in production

exports.register = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'Username and password are required.' });

  // bcrypt.hash(password, 10, (err, hash) => {
  //   if (err) {
  //     console.error('Error hashing password:', err);
  //     return res.status(500).json({ message: 'Error hashing password' });
  //   }

    db.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, password],
      (err) => {
        if (err) {
          console.error('Database error:', err); // Improved logging
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'Username already exists' });
          }
          return res.status(500).json({ message: 'Database error' });
        }
        res.status(201).json({ message: 'User registered successfully' });
      }
    );
  };

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'Username and password are required.' });

  db.query(
    'SELECT * FROM users WHERE username = ?',
    [username],
    (err, results) => {
      if (err || results.length === 0) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const user = results[0];

      // bcrypt.compare(password, user.password, (err, isMatch) => {
      //   if (err || !isMatch) {
      //     return res.status(401).json({ message: 'Invalid username or password' });
      //   }

        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
          expiresIn: '1h',
        });

        res.status(200).json({ token });
      });
    };
