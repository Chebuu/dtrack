const Network = require('./network');
const config = require('../../../config/config');

const fabricConfig = process.env.NODE_ENV === 'development' ? config.fabric.local : config.fabric


const test = async () => {
  const network = new Network(fabricConfig);
  await network.connect('admin', 'mychannel', 'dtrack');
  const res = await network.invokeEvaluate('productExists', 'ID001')
  console.log(res.toString())
};

module.exports = {
  network: new Network(fabricConfig),
}
