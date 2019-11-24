const fabric = require('../api/fabric')


const query = {
  GET: async (req, res, next) => {
    const user = req.user.username
    const channel = req.params.channel
    const chaincode = req.params.chaincode
    await fabric.network.connect(user, channel, chaincode);
    // const res = await network.invokeEvaluate('productExists', 'ID001')
  },
  POST: (req, res, next) => {
    const user = req.user.username
    const channel = req.body.channel
    const chaincode = req.body.chaincode
    
    await fabric.network.connect(user, channel, chaincode);
    // const res = await network.invokeEvaluate('productExists', 'ID001')
  }
}

const order = {
  GET: async (req, res, next) => {

  },
  POST: async (req, res, next) => {
    const user = req.user.username
    const channel = req.body.channel
    const chaincode = req.body.chaincode
    const value = req.body.value
    await fabric.network.connect(user, channel, chaincode);
    const result = await network.invokeSubmit('createOrder', value)
  }
}

const update = {
  GET: async (req, res, next) => {

  },
  POST: async (req, res, next) => {

  }
}

const docs = {
  GET: async (req, res, next) => {

  },
  POST: async (req, res, next) => {

  }
}