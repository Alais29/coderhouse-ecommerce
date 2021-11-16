export default {
  get: {
    tags: ['Authentication'],
    description: 'Log in to the system.',
    operationId: 'logout',
    parameters: [],
    responses: {
      200: {
        description: 'Successful Logout.',
      },
    },
  },
};
