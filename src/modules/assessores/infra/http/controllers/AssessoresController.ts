import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAssessorService from '@modules/assessores/services/CreateAssessorService';

class AssessoresController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, userId } = request.body;

    const createAssessor = container.resolve(CreateAssessorService);

    const assessor = await createAssessor.execute({ nome, userId });
    return response.json(assessor);
  }
}

export default AssessoresController;
