import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import schema from './schema/index.js';

const app = express();

app.use("/", createHandler({ schema }));

export default app;
