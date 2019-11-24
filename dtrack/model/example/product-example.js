'use strict';


const meta = {
  product_id: 'PID001',
  qr_code: '',
  active: true,
  mass_g: 1000,
  type: 'DISTILLATE',
  seal: {
    sealed: false,
    date: null
  }
};

const intake = {
  date: '2019-11-24T11:24:53.878Z',
  batch_id: 'BID001',
  type: 'BHO',
  mass_g: 1500,
  client: '<See Client Schema>'
};

const procedures = [
  {
    type: 'DISTILLATION',
    method: 'SHORT PATH',
    date: '2019-11-25T09:10:52.878Z',
    system: '<Some Distillation System>',
    input: {
      in_mass_g: 1500,
    },
    output: {
      mains_mass_g: 500,
      tails_mass_g: 250,
      terps_mass_g: 250,
      waste_mass_g: 500,
    },
    rex: {
      type: 'object',
      properties: {
        in_mass_g: 'number',
      }
    },
    isolate: {
      type: 'object',
      properties: {
        mass_g: 'number',
        mass_percent: 'number',
      }
    }
  },
  {
    type: 'DISTILLATION',
    method: 'WIPED FILM',
    date: '2019-11-25T09:10:52.878Z',
    system: '<Some Distillation System>',
    input: {
      in_mass_g: 1500,
    },
    output: {
      mains_mass_g: 500,
      tails_mass_g: 250,
      terps_mass_g: 250,
      waste_mass_g: 500,
    },
    rex: {
      type: 'object',
      properties: {
        in_mass_g: 'number',
      }
    },
    isolate: {
      type: 'object',
      properties: {
        mass_g: 'number',
        mass_percent: 'number',
      }
    }
  },
  {
    type: 'CRYSTALLIZATION',
    method: 'ETHANOL',
    date: '2019-11-26T09:10:52.878Z',
    input: {
      in_mass_g: 100
    },
    output: {
      out_mass_g: 90
    }
  }
];

const outtake = {
  date: '2019-11-27T07:01:21.878Z',
  client: '<See Client Schema>',
};

module.exports = {
  meta,
  intake,
  procedures,
  outtake,
};
