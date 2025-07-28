import "./style.scss";
import {useEffect, useState} from "react";
import DecrementIcon from '../../../../icons/decrement-icon.svg';
import IncrementIcon from '../../../../icons/increment-icon.svg';


interface ICounterProps {

    className?: string;
    initialStateValue?: number,
    getCountValue?: (value: number) => void;
}
export function Counter ({className, initialStateValue, getCountValue}:ICounterProps)  {


    const [count, setCount] = useState(initialStateValue !== undefined ? initialStateValue :0);

    useEffect(() => {
        if (getCountValue) {
            getCountValue(count);
        }
    }, [count]);
    return (
        <div className={`counter ${className}`}>
            <button type='button' name='decrement'
                    id='decrement'
                    className='counter__btn'
                    onClick={() => setCount((prev) => prev - 1)}
                    disabled={count < 1 ? true : false}
            >
                <img width={24} height={24}
                     className='counter__icon'
                     src={DecrementIcon} alt=''
                />
            </button>
            <div className='counter__value'>
                {count}
            </div>
            <button type='button' name='increment' id='increment'
                    className='counter__btn'
                    onClick={() => setCount((prev) => prev + 1)}>
                <img width={24} height={24}
                     className='counter__icon'
                     src={IncrementIcon} alt=''
                />
            </button>
        </div>
    );
}

