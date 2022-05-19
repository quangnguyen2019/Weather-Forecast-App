export const PS_access_key = 'e783d1497d866cc660e2f1ffa5e7f0fa';
export const Openweathermap_key = 'a3de72c34d5f784fd455b6a1dac06004';

export interface IData {
    address: string;
    unit: Units;
    weatherData: {
        current: {
            temp: number;
            feels_like: number;
            pressure: number;
            humidity: number;
            dew_point: number;
            visibility: number;
            wind_speed: number;
            wind_deg: number;
            weather: [
                {
                    description: string;
                    icon: string;
                }
            ];
        };
        daily: [
            {
                dt: number;
                temp: {
                    min: number;
                    max: number;
                };
                weather: [
                    {
                        description: string;
                        icon: string;
                    }
                ];
            }
        ];
    };
}

export enum Units {
    C = 'metric',
    F = 'imperial',
}

export const replaceWhitespace = (searchValue: string) => {
    // replace whitespace ( '\s' in regex ) with '%20'
    return searchValue.trim().replace(/\s/g, '%20');
};
