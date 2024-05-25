import chalk from 'chalk';
import 'dotenv/config';
import app from './app.js';

import { systemLogs } from './utils/logger.js';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(
    `${chalk.green.bold('✔')} 👍 Server running in ${chalk.yellow.bold(process.env.NODE_ENV)} mode on port ${chalk.blue.bold(PORT)}`,
  );
  systemLogs.info(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`,
  );
});
