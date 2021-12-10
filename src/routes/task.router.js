const { Router } = require('express');

module.exports = ({ TaskController }) => {
  const router = Router();

  router.get('/', TaskController.list);
  router.get('/:id', TaskController.retrieve);
  router.post('/', TaskController.create);
  router.put('/:id', TaskController.update);
  router.delete('/:id', TaskController.delete);

  return router;
};
