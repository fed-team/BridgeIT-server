import expressPromiseRouter from 'express-promise-router';

import {role as Controller} from '@/controllers';
import { validateParam, validateBody, schema } from '@/helpers/routeHelpers';

const router = expressPromiseRouter();

router.route('/')
    .get(Controller.index)
    .post(validateBody(schema.role.post), Controller.add);

router.route('/:desiredAction((((de)?)activate))/:id')
    .patch( validateParam(schema.id, 'id'), Controller.switchActivity);

router.route('/:id')
    .get(validateParam(schema.id, 'id'), Controller.get)
    .put([validateParam(schema.id, 'id'), validateBody(schema.role.put)], Controller.replace)
    .patch([validateParam(schema.id, 'id'), validateBody(schema.role.patch)], Controller.update);


export default router;