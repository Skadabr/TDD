var priceSchema, tribunes, sectors;
function initData() {

    tribunes = [
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

    priceSchema = {
        sectors: [
            {
                name: '1',
                price: 10
            }, {
                name: '2',
                price: 20
            }
        ]
    };

    sectors = [
        {
            name: '1',
            rows: [
                {
                    name: '1',
                    seats: [
                        {
                            name: '1'
                        }, {
                            name: '2',
                        }, {
                            name: '3',
                        }, {
                            name: '4',
                        }, {
                            name: '5',
                        }
                    ]
                }, {
                    name: '2',
                }, {
                    name: '3',
                }, {
                    name: '4',
                }, {
                    name: '5',
                }
            ]
        }
    ]


}


function setSectorPrice(sectorName, price) {
    if (getSectorPriceBySectorName(sectorName)) {
        priceSchema.sectors = priceSchema.sectors.filter(sector => sector.name != sectorName)
    }
    priceSchema.sectors.push({name: sectorName, price: price});
}

function getSectorPriceBySectorName(sectorName) {
    let [ sector ] = priceSchema.sectors.filter(sector => sector.name === sectorName);
    if (sector) return sector.price;
    return false;
}

function getTribuneBySector(sector) {
    let [ tribune ] = tribunes.filter(tribune => tribune.sectors.includes(sector));
    return tribune.name;
}

function setTribunePrice(tribune, price) {
}

function getTribunePrice(tribune, price) {
}

function setSectorAvailable(sectorName) {
}

function getSectorAvailable(sectorName) {
}

function setSectorRowAvailable(sectorName, rowName) {
}

function getSectorRowAvailable(sectorName, rowName) {

}

function getSectorDataForRender(sectorName) {

}


test('get sector 1 data for render sector page', () => {
    initData();
    setSectorAvailable('1');
    setTribunePrice('west', 20);
    setSectorRowAvailable('1','1');
    expect(getSectorDataForRender('1')).toEqual({
        name: '1',
        rows: [
            {
                name: '1',
                seats: [
                    {
                        name: '1'
                    }, {
                        name: '2',
                    }, {
                        name: '3',
                    }, {
                        name: '4',
                    }, {
                        name: '5',
                    }
                ]
            }
        ]
    });
});

test('If I set tribune price then all children sectors shoud have this price', () => {
    initData();
    setTribunePrice('north', 20);
    expect(getSectorPriceBySectorName('4')).toBe(20);
    expect(getSectorPriceBySectorName('5')).toBe(20);
    expect(getSectorPriceBySectorName('6')).toBe(20);
});


test('set plus getSectorPriceBySectorName', () => {
    initData();
    setSectorPrice('1', 20);
    expect(getSectorPriceBySectorName('1')).toBe(20);
});

test('getSectorPriceBySectorName', () => {
    initData();
    expect(getSectorPriceBySectorName('1')).toBe(10);
});

test('getSectorPriceBySectorName for non existent record', () => {
   expect(getSectorPriceBySectorName('3')).toBe(false);
});

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
