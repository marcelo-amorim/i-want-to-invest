import { createConnection, getConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

// createConnection();

async function connect(): Promise<void> {
  // read connection options from ormconfig file (or ENV variables)
  const connectionOptions = await getConnectionOptions();

  // do something with connectionOptions,
  // for example append a custom naming strategy or a custom logger
  Object.assign(connectionOptions, {
    namingStrategy: new SnakeNamingStrategy(),
  });

  // create a connection using modified connection options
  await createConnection(connectionOptions);
}

connect();
