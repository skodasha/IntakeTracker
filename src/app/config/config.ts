import Config from 'react-native-config';

import { version } from '../../../package.json';

const { STORAGE_ENCRYPTION_KEY, STORAGE_ID, API_URL } = Config;

const config = {
  app: {
    version,
  },
  storage: {
    encryptionKey: STORAGE_ENCRYPTION_KEY || '',
    id: STORAGE_ID || '',
  },
  api: {
    url: API_URL || '',
  },
};

export default config;
