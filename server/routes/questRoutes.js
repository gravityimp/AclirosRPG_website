const router = require('express').Router();
const QuestController = require('../controllers/QuestController');


router.get('/', QuestController.getAllQuests);
router.get('/:id', QuestController.getQuestById);
router.post('/', QuestController.createQuest);
router.put('/:id', QuestController.updateQuestById);
router.delete('/:id', QuestController.deleteQuestById);

module.exports = router;