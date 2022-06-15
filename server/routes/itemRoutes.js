const router = require('express').Router();
const ItemController = require('../controllers/ItemController');


router.get('/', ItemController.getAllItems);
router.get('/:id', ItemController.getItemById);
router.post('/', ItemController.createItem);
router.put('/:id', ItemController.updateItemById);
router.delete('/:id', ItemController.deleteItemById);

module.exports = router;
