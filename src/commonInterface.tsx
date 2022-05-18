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
