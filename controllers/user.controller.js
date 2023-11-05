const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

function index(req, res) {
  models.User.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Something went wrong',
        error: error,
      });
    });
}

function destroy(req, res) {
  const id = req.params.id;

  models.User.destroy({ where: { id: id } })
    .then((result) => {
      res.status(200).json({
        message: 'User deleted successfully',
        user: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Something went wrong',
        error: error,
      });
    });
}

function signUp(req, res) {
  models.User.findOne({ where: { email: req.body.email } })
    .then((result) => {
      if (result) {
        res.status(409).json({
          message: 'Email already exists',
        });
      } else {
        bcryptjs.genSalt(10, function (err, salt) {
          bcryptjs.hash(req.body.password, salt, function (err, hash) {
            const user = {
              name: req.body.name,
              email: req.body.email,
              password: hash,
            };

            models.User.create(user)
              .then((result) => {
                res.status(201).json({
                  message: 'User created successfully',
                  user: result,
                });
              })
              .catch((error) => {
                res.status(500).json({
                  message: 'Something went wrong',
                  error: error,
                });
              });
          });
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Something went wrong',
        error: error,
      });
    });
}

function login(req, res) {
  models.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user === null) {
        res.status(401).json({
          message: 'Invalid credentials',
        });
      } else {
        bcryptjs.compare(
          req.body.password,
          user.password,
          function (err, result) {
            if (result) {
              const token = jwt.sign(
                {
                  email: user.email,
                  userId: user.id,
                },
                'secret',
                function (err, token) {
                  res.status(200).json({
                    message: 'Authentication successfully',
                    name: user.name,
                    email: user.email,
                    token: token,
                  });
                }
              );
            } else {
              res.status(401).json({
                message: 'Invalid credentials',
              });
            }
          }
        );
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Something went wrong',
        error: error,
      });
    });
}

module.exports = {
  index: index,
  destroy: destroy,
  signUp: signUp,
  login: login,
};
