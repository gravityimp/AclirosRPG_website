const router = require('express').Router();
const NpcController = require('../controllers/NpcController');


router.get('/', NpcController.getAll);
router.get('/:id', NpcController.getNpcById);
router.post('/', NpcController.createNpc);
router.put('/:id', NpcController.updateNpcById);
router.delete('/:id', NpcController.deleteNpcById);

module.exports = router;
