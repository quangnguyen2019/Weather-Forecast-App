import { useState } from 'react';
import classNames from 'classnames';
import { IData, Units } from '../global';

interface IProps {
    dataApp: IData;
    handleChangeUnit: (newUnit: Units) => void;
}

const UnitSwitch = ({ dataApp, handleChangeUnit }: IProps) => {
    const [is_C_Deg_Active, setIs_C_Deg_Active] = useState(
        dataApp.unit === Units.C ? true : false
    );

    const changeUnit = (e: any) => {
        const unit = e.target.getAttribute('data-unit');

        if (unit === 'C' && dataApp.unit === Units.C) return;
        if (unit === 'F' && dataApp.unit === Units.F) return;

        unit === 'C' ? handleChangeUnit(Units.C) : handleChangeUnit(Units.F);
        setIs_C_Deg_Active(!is_C_Deg_Active);
    };

    return (
        <div className="unit-switch">
            <button
                data-unit="C"
                onClick={changeUnit}
                className={classNames('btn-unit', 'margin-right', {
                    active: is_C_Deg_Active,
                })}
            >
                &deg;C
            </button>
            {/* <span> | </span> */}
            <button
                data-unit="F"
                onClick={changeUnit}
                className={classNames('btn-unit', {
                    active: !is_C_Deg_Active,
                })}
            >
                &deg;F
            </button>
        </div>
    );
};

export default UnitSwitch;
