export const PS_access_key = 'e783d1497d866cc660e2f1ffa5e7f0fa';
export const Openweathermap_key = 'a3de72c34d5f784fd455b6a1dac06004';
export const AirVisual_key = 'ed4704f1-f263-4822-9f74-9129e5805a6a';

export interface IData {
    address: string;
    unit: Units;
    weatherData: {
        lat: number;
        lon: number;
        current: {
            dt: number;
            sunrise: number;
            sunset: number;
            temp: number;
            uvi: number;
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
        hourly: [
            {
                dt: number;
                temp: number;
                pop: number;
            }
        ];
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

export enum ColorLevels {
    Green = '#05d75a',
    Yellow = '#fdd64b',
    Orange = 'orange',
    Red = '#e10303',
    Purple = '#ad00ad',
}

export const replaceWhitespace = (searchValue: string) => {
    // replace whitespace ( '\s' in regex ) with '%20'
    return searchValue.trim().replace(/\s/g, '%20');
};

// Input: timestamp (unix)
// Output: 09:10 AM (PM),
export const getTimeString = (dateTime?: number) => {
    let d = dateTime ? new Date(dateTime * 1000) : new Date();
    let amOrPm = d.getHours() > 12 ? 'PM' : 'AM';
    let minutes = d.getMinutes() >= 10 ? d.getMinutes() : '0' + d.getMinutes();
    let hours = '';
    let initialHours = d.getHours();

    if (initialHours < 10) {
        // (< 10h): 0h -> 9h
        hours = '0' + initialHours;
    } else if (initialHours < 13) {
        // (10h <= x < 13h): 10h -> 12h
        hours = '' + initialHours;
    } else if (initialHours < 22) {
        // (13h <= x < 22h)
        hours = '0' + (initialHours - 12);
    } else {
        hours = '' + (initialHours - 12);
    }

    return `${hours}:${minutes} ${amOrPm}`;
};
