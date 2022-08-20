import importedCountries from './assets/countries.json';
const countries = importedCountries as Array<country>

export type country = { name: string, region: string, subregion?: string, capital: string, flags: { svg: string, png: string }, message?: string, code: string }
export async function getCountry(code: string): Promise<country | undefined> {
  for (let i = 0; i < countries.length; i++) {
    if (countries[i].code == code) return countries[i];
  }
}

export async function getRandomCountry(region?: string): Promise<country> {
  let arr = countries;

  if (region) {
    arr = arr.filter(c => c.subregion?.toLowerCase() == region.toLocaleLowerCase() || c.region.toLocaleLowerCase() == region.toLowerCase());
  }

  if (arr.length == 0) {
    arr = countries;
  }

  const len = arr.length;
  const rand = Math.floor(Math.random() * len);
  const country = arr[rand];

  return country;
}

export async function getRegions(): Promise<Array<string>> {
  return Array.from(new Set(countries.map(c => c.region)))
}

export async function getSubregions(): Promise<Array<string>> {
  return Array.from(new Set(countries.filter(c => c.subregion).map(c => c.subregion as string)))
}


