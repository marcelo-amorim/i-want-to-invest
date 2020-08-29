import { Router } from 'express';

const clientesRouter = Router();

clientesRouter.get('/', async (request, response) => {
  const assessorId = request.assessor.id;
  return response.json({ id: assessorId });
});

export default clientesRouter;
