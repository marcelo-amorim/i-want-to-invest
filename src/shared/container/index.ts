import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import AssessoresRepository from '@modules/assessores/infra/typeorm/repositories/AssessoresRepository';
import IAssessoresRepository from '@modules/assessores/repositories/IAssessoresRepository';

import IClientesRepository from '@modules/clientes/repositories/IClientesRepository';
import ClientesRepository from '@modules/clientes/infra/typeorm/repositories/ClientesRepository';

import IPropostasRepository from '@modules/propostas/repositories/IPropostasRepository';
import PropostasRepository from '@modules/propostas/infra/typeorm/repositories/PropostasRepository';

import FundosRepository from '@modules/fundos/infra/typeorm/repositories/FundosRepository';
import IFundosRepository from '@modules/fundos/repositories/IFundosRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IAssessoresRepository>(
  'AssessoresRepository',
  AssessoresRepository,
);

container.registerSingleton<IClientesRepository>(
  'ClientesRepository',
  ClientesRepository,
);

container.registerSingleton<IPropostasRepository>(
  'PropostasRepository',
  PropostasRepository,
);

container.registerSingleton<IFundosRepository>(
  'FundosRepository',
  FundosRepository,
);
