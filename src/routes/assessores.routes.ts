import { Router } from 'express';
import CreateAssessorService from '../services/CreateAssessorService';

const assessoresRouter = Router();

assessoresRouter.post('/', async (request, response) => {
  const { nome, userId } = request.body;

  const createAssessor = new CreateAssessorService();

  const assessor = await createAssessor.execute({ nome, userId });
  return response.json(assessor);
});

export default assessoresRouter;
