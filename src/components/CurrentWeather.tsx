const CurrentWeather = () => {
    return (
        <section className="current-weather">
            <div className="row gx-0">
                <p className="address mb-4"> Ninh Hòa, Khánh Hòa </p>
                <div className="col-2 col-md-1">
                    <img
                        src="http://openweathermap.org/img/wn/10d@2x.png"
                        alt=""
                    />
                </div>
                <div className="col-2 col-md-1 current-temperature mx-3">
                    <span className="temperature-number">20</span>
                    <span>°C</span>
                </div>
                <div className="col-6 current-description">
                    <p>Sunny</p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-2 detail-item">
                    <span>Wind</span>
                    <span>30km/h</span>
                </div>
                <div className="col-2 detail-item">
                    <span>Humidity</span>
                    <span>89%</span>
                </div>
                <div className="col-2 detail-item">
                    <span>Visibility</span>
                    <span>7km</span>
                </div>
                <div className="col-2 detail-item">
                    <span>Wind</span>
                    <span>30km/h</span>
                </div>
                <div className="col-2 detail-item">
                    <span>Pressure</span>
                    <span>1010mb</span>
                </div>
                <div className="col-2 detail-item">
                    <span>Dew Point</span>
                    <span>25&deg;</span>
                </div>
            </div>
        </section>
    );
};

export default CurrentWeather;
