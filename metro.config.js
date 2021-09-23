// ?   at processTicksAndRejections (node:internal/process/task_queues:96:5)
// ?   at async Promise.all (index 27) {
// ?     mockPath1: 'amplify/backend/function/SignalClonePostConfirmation/src/package.json',
// ?     mockPath2: 'amplify/#current-cloud-backend/function/SignalClonePostConfirmation/src/package.json'
// ?  }
// ? 위 오류 해결법.
// ? https://stackoverflow.com/questions/60852276/amplify-react-native-duplicate-error-using-amplify-add-api
module.exports = {
  resolver: {
    blacklistRE: /#current-cloud-backend\/.*/,
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
