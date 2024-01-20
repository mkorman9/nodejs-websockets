import {createApp, appendErrorHandlers} from './http/app_template';
import websocketAPI from './websocket_api';
import config from './config';

const app = createApp({
  corsOrigin: config.HTTP_CORS_ORIGIN,
  trustProxies: config.HTTP_TRUST_PROXIES
});

app.ws('/ws', websocketAPI);

export default appendErrorHandlers(app);
