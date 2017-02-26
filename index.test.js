var priceSchema, stadium, availablityRow;
function initData() {

    //noinspection JSAnnotator
  stadium = {
      tribune_north: {
        name: 'north',
        sector_10: {
          name: '10',
            rows: [
              {
                name: '00',
                seats: '16'
              },
              {
                name: '01',
                seats: '25'
              }
            ]
        }
      },
      tribune_west: {
        name: 'west',
          sector_1: {
          name: '1',
            rows: [
              {
                name: '00',
                seats: '16'
              },
              {
                name: '01',
                seats: '25'
              },
              {
                name: '02',
                seats: '25'
              }
            ]
        }
      },tribune_east: {
      name: 'east',
      sector_21: {
        name: '21',
        rows: [
          {
            name: '00',
            seats: '16'
          },
          {
            name: '01',
            seats: '25'
          }
        ]
      }
    }
  };

    priceSchema = {
        tribune_north: {
            name: 'north',
          price: '20',
          available: true,
          sector_10: {
            name: '10',
            available: true
          }
        },
        tribune_east: {
          name: 'east',
          available: true,
          sector_21: {
            name: '21',
            price: '30',
            available: true
          },
          sector_22: {
            name: '22',
            price: '10',
            available: true
          }
        }
    };

  availablityRow = {
    sector_1: {
        name: '1',
      rows: [
        {
            name: '00',
          available: true
        }
      ]
    },
    sector_10: {
      name: '10',
      rows: [
        {
          name: '00',
          available: true
        }
      ]
    },
    sector_21: {
      name: '21',
      rows: [
        {
          name: '00',
          available: true
        }
      ]
    }
  }
}


function setSectorPrice(tribuneName, sectorName, price) {
    if (!priceSchema['tribune_'+tribuneName]) {
      priceSchema['tribune_'+tribuneName] = { name: tribuneName, available: false };
    }
    priceSchema['tribune_'+tribuneName]['sector_'+sectorName] = Object.assign({}, {name: sectorName, price: price, available: true});
}

function getSectorPrice(tribuneName, sectorName) {
    let sector = priceSchema['tribune_'+tribuneName] ? priceSchema['tribune_'+tribuneName]['sector_'+sectorName] : false,
        tribunePrice = getTribunePrice(tribuneName);

     if (!sector) return false;
    if (sector && sector.price) return sector.price;
    if (tribunePrice) return tribunePrice;
    return false;
}

/*function getTribuneBySector(sector) {
    let [ tribune ] = tribunes.filter(tribune => tribune.sectors.includes(sector));
    return tribune.name;
}*/

function setTribunePrice(tribuneName, price) {
  if (priceSchema['tribune_' + tribuneName]) {
    priceSchema['tribune_' + tribuneName].price = price;
    priceSchema['tribune_' + tribuneName].available = true;
  } else {
    priceSchema['tribune_' + tribuneName] = Object.assign({}, {
      name: tribuneName,
      price: price,
      available: true
    });
  }
}

function getTribunePrice(tribuneName) {
  if (priceSchema['tribune_'+tribuneName] && priceSchema['tribune_'+tribuneName].available) {
      return priceSchema['tribune_'+tribuneName].price;
  }
  return false;
}
/*
function setSectorAvailable(sectorName) {
}

function getSectorAvailable(sectorName) {
}*/

function setSectorRowAvailable(sectorName, rowName) {
  if (availablityRow['sector_'+sectorName]) {
    availablityRow['sector_'+sectorName].rows = availablityRow['sector_'+sectorName].rows.filter(row => row.name !== rowName);

      availablityRow['sector_'+sectorName].rows.push({name: rowName, available: true});
  } else {
    availablityRow['sector_'+sectorName] = { name: rowName, rows: [] };
    availablityRow['sector_'+sectorName].rows.push({name: rowName, available: true});
  }
}

function getSectorRowAvailable(sectorName, rowName) {
if (availablityRow['sector_'+sectorName]) {

    return !!availablityRow['sector_'+sectorName].rows.filter(row => row.name === rowName).length;
}
return false;
}

function getSectorDataForRender(tribuneName, sectorName) {
let rows = stadium['tribune_'+tribuneName]['sector_'+sectorName].rows;
  return rows.map(row => Object.assign({}, {
  name: row.name,
  seats: row.seats,
  available: getSectorRowAvailable(sectorName, row.name)
}));
}


test('get sector 1 data for render sector page', () => {
    initData();
    //setSectorAvailable('1');
    //setTribunePrice('west', true, 20);
    setSectorRowAvailable('1','00');
    expect(getSectorDataForRender('west', '1')).toEqual([
      {
        name: '00',
        seats: '16',
        available: true
      },
      {
        name: '01',
        seats: '25',
        available: false
      },
      {
        name: '02',
        seats: '25',
        available: false
      }
    ]);
});

test('If I set tribune price then all children sectors shoud have this price', () => {
    initData();
    setTribunePrice('north', 30);
    expect(getSectorPrice('north','10')).toBe(30);
    expect(getSectorPrice('north','11')).toBeFalsy();
    //expect(getSectorPrice('6')).toBe(20);
});


test('set plus getSectorPriceBySectorName', () => {
    initData();
    setSectorPrice('east', '21',  50);
    expect(getSectorPrice('east', '21')).toBe(50);
});

test('getSectorPriceBySectorName', () => {
    initData();
    expect(getSectorPrice('north', '10')).toBe('20');
});

test('getSectorPrice for non existent record', () => {
   expect(getSectorPrice('north', '11')).toBe(false);
});
/*
test('getTribuneBySector', () => {
    expect(getTribuneBySector('1')).toBe('west');
    expect(getTribuneBySector('2')).toBe('west');
    expect(getTribuneBySector('3')).toBe('west');
    expect(getTribuneBySector('4')).toBe('north');
    expect(getTribuneBySector('5')).toBe('north');
    expect(getTribuneBySector('6')).toBe('north');
    expect(getTribuneBySector('7')).toBe('east');
    expect(getTribuneBySector('8')).toBe('east');
    expect(getTribuneBySector('9')).toBe('east');
});
*/