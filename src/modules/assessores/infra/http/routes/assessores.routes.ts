import { Router } from 'express';
import { container } from 'tsyringe';

import CreateAssessorService from '@modules/assessores/services/CreateAssessorService';

const assessoresRouter = Router();

assessoresRouter.post('/', async (request, response) => {
  const { nome, userId } = request.body;

  const createAssessor = container.resolve(CreateAssessorService);

  const assessor = await createAssessor.execute({ nome, userId });
  return response.json(assessor);
});

export default assessoresRouter;
