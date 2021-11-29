import getMessages from './getMessages';

export default {
  '/chat/{userEmail}': {
    ...getMessages,
  },
};
