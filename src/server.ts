import 'reflect-metadata';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import './database';
import './shared/container';

import { router } from './routes';
import swaggerFile from './swagger.json';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);
app.get('/', (req, res) => {
  return res.json({ message: 'Hello World' });
});

app.listen(3333, () => console.log('Server is running on port 3333!!'));
