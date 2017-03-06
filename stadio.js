export const sectorForRender1 = {
  name: '1',
  rows: [
    {
      name: '1',
      seats: [
        {
          name: '1',
          available: true
        },
        {
          name: '2',
          available: true
        },
        {
          name: '3',
          available: true
        }
      ]
    },
    {
      name: '2',
      seats: [
        {
          name: '1',
          available: true
        },
        {
          name: '2',
          available: true
        },
        {
          name: '3',
          available: false
        }
      ]
    },
    {
      name: '3',
      seats: [
        {
          name: '1',
          available: false
        },
        {
          name: '2',
          available: false
        },
        {
          name: '3',
          available: false
        }
      ]
    }
  ]
};

const rowsTemplate = [
  {
    name: '1',
    seats: [
      {
        name: '1'
      },
      {
        name: '2'
      },
      {
        name: '3'
      }
    ]
  },
  {
    name: '2',
    seats: [
      {
        name: '1'
      },
      {
        name: '2'
      },
      {
        name: '3'
      }
    ]
  },
  {
    name: '3',
    seats: [
      {
        name: '1'
      },
      {
        name: '2'
      },
      {
        name: '3'
      }
    ]
  }
];

export getSectorConstByName = (sectorName) => {
  return {name: sectorName, rows: rowsTemplate}
};

export const tribunesConst = [
  {
    name: 'west',
    sectors: ['1', '2', '3']
  },
  {
    name: 'north',
    sectors: ['4', '5', '6']
  },
  {
    name: 'east',
    sectors: ['7', '8', '9']
  }
];