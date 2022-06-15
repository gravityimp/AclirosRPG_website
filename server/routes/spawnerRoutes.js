const router = require('express').Router();
const SpawnerController = require('../controllers/SpawnerController');


router.get('/', SpawnerController.getAllSpawners);
router.get('/:id', SpawnerController.getSpawnerById);
router.post('/', SpawnerController.createSpawner);
router.put('/:id', SpawnerController.updateSpawnerById);
router.delete('/:id', SpawnerController.deleteSpawnerById);

module.exports = router;
