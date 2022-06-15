const router = require('express').Router();
const MobController = require('../controllers/MobController');


router.get('/', MobController.getAllMobs);
router.get('/:id', MobController.getMobById);
router.post('/', MobController.createMob);
router.put('/:id', MobController.updateMobById);
router.delete('/:id', MobController.deleteMobById);

module.exports = router;
