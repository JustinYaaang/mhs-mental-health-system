var router = require('express').Router();
var questionController = require('../../controller/v1/questionController');

router.route('/')
    /**
     * @swagger
     * /api/v1/questionnaire_sJS:
     *    get:
     *      description: This should return all forms
     */
    .get(questionController.index)
    /**
     * @swagger
     * /api/v1/questionnaire_sJS:
     *    post:
     *      description: This will create a new form
     */
    .post(questionController.new);


    router.route('/:id')
    /**
     * @swagger
     * /api/v1/questionnaire_sJS/:id:
     *    get:
     *      description: Get a form by ID
     */
    .get(questionController.view)
    /**
     * @swagger
     * /api/v1/questionnaire_sJS/:id:
     *    patch:
     *      description: Update a form by ID
     */
    .patch(questionController.update)
    /**
     * @swagger
     * /api/v1/questionnaire_sJS/:id:
     *    put:
     *      description: Update a form by ID
     */
    .put(questionController.update)
    /**
     * @swagger
     * /api/v1/questionnaire_sJS/:id:
     *    delete:
     *      description: Delete a form by ID
     */
    .delete(questionController.delete);

module.exports = router;
