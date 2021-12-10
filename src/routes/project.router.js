const { Router } = require('express');

module.exports = ({ ProjectController }) => {
  const router = Router();

  router.get('/', ProjectController.list);
  router.get('/:id', ProjectController.retrieve);
  router.post('/', ProjectController.create);
  router.put('/:id', ProjectController.update);
  router.delete('/:id', ProjectController.delete);

  return router;
};
