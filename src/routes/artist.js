const express = require('express');
const artistController = require('../controllers/artist')
const router = express.Router();

const app = express();

app.use(express.json());

router.post('/', artistController.create);
router.get('/', artistController.read);
router.get('/:artistId', artistController.readById);
router.patch('/:artistId', artistController.update);
router.post('/:artistId/album')

module.exports = router;