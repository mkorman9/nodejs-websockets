import {createApp, appendErrorHandlers} from './http/app_template';
import websocketAPI from './websocket_api';

const app = createApp();

app.ws('/ws', websocketAPI);

export default appendErrorHandlers(app);
