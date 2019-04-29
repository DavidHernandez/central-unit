
const config = require('./config');
const Bus = require('./src/infrastructure/Bus.js');
const OrchestraDirector = require('./src/OrchestraDirector');

(() => {
  loadProviders();
  startEndpoints();
})();

function loadProviders() {
  const bus = new Bus();
  for (const provider of config.providers) {
    try {
      const subscriptions = require('./src/packages/providers/' + provider);
      for (subscription in subscriptions) {
        bus.subscribe(subscription, subscriptions[subscription])
      }
    } catch (e) {
      console.error('loading.provider', e);
    }
  }
}

function startEndpoints() {
  const director = new OrchestraDirector();
  for (const endpoint of config.endpoints) {
    try {
      require('./src/packages/endpoints/' + endpoint)(director);
    } catch (e) {
      console.error('loading.endpoint', e);
    }
  }
}
