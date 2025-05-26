import Config from 'react-native-config';

import { version } from '../../../package.json';

const { API_URL, STORAGE_ENCRYPTION_KEY, STORAGE_ID } = Config;

const config = {
  api: {
    url: API_URL || '',
  },
  app: {
    version,
  },
  storage: {
    encryptionKey: STORAGE_ENCRYPTION_KEY || '',
    id: STORAGE_ID || '',
  },
};

export default config;
