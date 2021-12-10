const { Router } = require('express');

module.exports = ({ UserController }) => {
  const router = Router();

  router.get('/', UserController.list);
  router.get('/:id', UserController.retrieve);
  router.post('/', UserController.create);
  router.put('/:id', UserController.update);
  router.delete('/:id', UserController.delete);

  return router;
};
