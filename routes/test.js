import expressPromiseRouter from 'express-promise-router'

import Controller from '../controllers/test'
import { validateParam, validateBody, schema } from '../helpers/routeHelpers'

const router = expressPromiseRouter()
router.route('/')
    .get(Controller.index)
    .post(validateBody(schema.test.post), Controller.add)

router.route('/nowtest')
    .get(Controller.index)

router.route('/:id')
    .get(validateParam(schema.id, 'id'), Controller.get)
    .put([validateParam(schema.id, 'id'), validateBody(schema.test.put)], Controller.replace)
    .patch([validateParam(schema.id, 'id'), validateBody(schema.test.patch)], Controller.update)


export default router