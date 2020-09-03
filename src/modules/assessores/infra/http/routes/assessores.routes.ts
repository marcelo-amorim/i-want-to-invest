import { Router } from 'express';

import CreateAssessorService from '@modules/assessores/services/CreateAssessorService';

import AssessoresRepository from '@modules/assessores/infra/typeorm/repositories/AssessoresRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const assessoresRouter = Router();

assessoresRouter.post('/', async (request, response) => {
  const assessoresRepository = new AssessoresRepository();
  const usersRepository = new UsersRepository();

  const { nome, userId } = request.body;

  const createAssessor = new CreateAssessorService(
    assessoresRepository,
    usersRepository,
  );

  const assessor = await createAssessor.execute({ nome, userId });
  return response.json(assessor);
});

export default assessoresRouter;
