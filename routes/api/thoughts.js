const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReactionToThought,
    deleteReactionFromThought,
} = require('../../controllers/thoughtControllers');

router.route('/').get(getThoughts).post(createThought);

router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

router
    .route('/:thoughtId/reactions')
    .post(addReactionToThought)

router
    .route('/:thoughtId/reactions/:reactionsId')
    .delete(deleteReactionFromThought);

module.exports = router;
