export class CountryList {
    countryCode: string;
    name: string;
}

export class CountryDetails {
    commonName: string;
    officialName: string;
    countryCode: string;
    region: string;
    borders: object | null;
}

export class PopulationInfo {
    year: number;
    value: number;
}

export class CountryBorderInfo {
    commonName: string;
    officialName: string;
    countryCode: string;
    region: string;
    borders: CountryDetails[];
}

export class CountryInfo {
    countryName: string;
    countryBorderInfo: CountryBorderInfo[];
    countryPopulationInfo: PopulationInfo[];
    flagImg: string;
}

export class CountryPopulationInfoDetails {
    country: string;
    code: string;
    iso3: string;
    populationCounts: PopulationInfo[];
}

export class CountryPopulationInfo {
    error: string;
    msg: string;
    data: CountryPopulationInfoDetails[];
}
