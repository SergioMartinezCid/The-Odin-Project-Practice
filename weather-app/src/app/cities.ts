const countries: Array<string> = new Array();
const cities: Array<Array<string>> = new Array();

countries.push('gb');
cities.push(new Array());
cities[0].push('London');
cities[0].push('Manchester');
cities[0].push('Belfast');
cities[0].push('Cambridge');

countries.push('es');
cities.push(new Array());
cities[1].push('Madrid');
cities[1].push('Ciudad Real');
cities[1].push('Barcelona');
cities[1].push('Aragon');

export { countries, cities };
