const router = require('express').Router();
const PlayerController = require('../controllers/PlayerController');

router.get('/', PlayerController.getAllPlayers);
router.get('/:uuid', PlayerController.getPlayerByUuid);
router.get('/name/:name', PlayerController.getPlayerByName);
router.get('/:uuid/roles', PlayerController.getPlayerRoles);
router.post('/generate', PlayerController.generatePlayer);
router.put('/:uuid', PlayerController.updatePlayer);
router.delete('/:uuid', PlayerController.deletePlayer);


module.exports = router;