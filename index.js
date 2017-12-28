import setupApp from './src/app';
import env from './src/config/env';

const port = env.app.port || 3000;

setupApp()
  .then(app => app.listen(process.env.PORT || port, () => console.log(`app running on port ${port}`)))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
