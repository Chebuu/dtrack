'use strict';

const meta = {
  type: 'object',
  properties: {
    product_id: {
      type: 'string'
    },
    order_id: {
      type: 'string'
    },
    qr_code: {
      type: 'string',
    },
    active: {
      type: 'boolean' // Does the product physically exist in inventory? Or has it been transferred out?
    },
    mass_g: {
      type: 'number'
    },
    type: {
      type: 'string', // Current product type e.g. 'distillate' || 'moil' || 'isolate'
    },
    seal: {
      type: 'object',
      properties: {
        sealed: {
          type: 'boolean',
        },
        date: {
          type: 'date-time',
        }
      }
    }
  }
};

const intake = {
  // TODO::
  // // - Is batch_id really necessary if we have a QR code and asset ID attached to this asset?
  type: 'object',
  properties: {
    date: {
      type: 'date-time'
    },
    batch_id: {
      type: 'string'
    },
    type: {
      type: 'string' // Type before passed through distillation
    },
    mass_g: {
      type: 'number'
    },
    client: {
      $ref: 'CLIENT_SCHEMA'
    }
  }
};

const short_path = {
  // TODO::
  // // - Parameters that can be calculated (e.g. Total Mass Balance) have been excluded.
  // // // // - This may be a bad idea, because in the Data Collection spreadsheet, some columns required for calculation are left blank.
  // // // // - Perhaps the parameters should be included to allow for this "human error" to exist in the database.
  // // - This is an array, which assumes a batch can undergo multiple passes through short-path. Is that true?
  // // - What exactly are all these parameters?
  // // // // - Crystallization
  // // // // // // - I'm assuming there should be an input and output mass, but there is only an input mass.
  type: 'array',
  items: {
    type: 'object',
    properties: {
      date: {
        type: 'string' // Type before passed through distillation
      },
      system: {
        type: 'string',
      },
      input: {
        type: 'object',
        properties: {
          in_mass_g: 'number', // Labelled as "Input Crude" in Data Collection spreadsheet
        }
      },
      output: {
        type: 'object',
        properties: {
          mains_mass_g: 'number',
          tails_mass_g: 'number',
          terps_mass_g: 'number',
          waste_mass_g: 'number',
        }
      },
      crystallization: {
        type: 'object',
        properties: {
          in_mass_g: 'number',
        }
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
  }
};

const wiped_film = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      date: {
        type: 'date-time',
      },
      system: {
        type: 'string',
      },
      input: {
        type: 'object',
        properties: {
          in_mass_g: 'number', // Labelled as "Input Crude" in Data Collection spreadsheet
        }
      },
      output: {
        type: 'object',
        properties: {
          mains_mass_g: 'number',
          tails_mass_g: 'number',
          terps_mass_g: 'number',
          waste_mass_g: 'number',
        }
      },
      crystallization: {
        type: 'object',
        properties: {
          in_mass_g: 'number',
        }
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
    }
  }
};

// const distillation = [
//     // TODO::
//     // // - I think the wiped_film and short_path arrays should be combined into a single array of objects that specify the type of distillation.
//     // // // // - For now, the schema has been left as two arrays to reflect the structure of the Data Collection spreadsheet.
//     {
//         type: String, // wiped_film || short_path
//         date: Date,
//         system: String,
//         input: {
//             in_mass_g: Number, // Labelled as "Input Crude" in Data Collection spreadsheet
//         },
//         output: {
//             mains_mass_g: Number,
//             tails_mass_g: Number,
//             terps_mass_g: Number,
//             waste_mass_g: Number,
//         },
//         crystallization: {
//             in_mass_g: Number,
//         },
//         rex: {
//             in_mass_g: Number,
//         },
//         isolate: {
//             mass_g: Number,
//             mass_percent: Number,
//         },
//     }
// ];

const outtake = {
  date: {
    type: 'date-time'
  },
  client: {
    $ref: 'CLIENT_SCHEMA'
  },
};

exports = {
  meta,
  intake,
  short_path,
  wiped_film,
  outtake,
};
