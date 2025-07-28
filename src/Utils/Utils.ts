export class Utils {
    static stringHash(str: string, seed = 0) {
        let hash = seed;
        if ((str ?? "").length === 0) return hash;
        for (let i = 0; i < str.length; i++) {
            let chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0;
        }
        return hash;
    }
    static stringToHslColor(str: string, saturation: number = 30, lightness: number = 60) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        let h = hash % 360;
        return 'hsl('+h+', '+saturation+'%, '+lightness+'%)';
    }
    static isEmpty(value: any) {
        return (value == null || value.length === 0);
    }
    static mod(a: number, n: number) {
        return ((a % n) + n) % n;
    }

    static parseTrainDateTime(date: string, time: string) {
        const today = new Date();

        const months = [
            "январь",
            "февраль",
            "март",
            "апрель",
            "май",
            "июнь",
            "июль",
            "август",
            "сентябрь",
            "октябрь",
            "ноябрь",
            "декабрь",
        ];

        const dateInfo = date.split(/\s+/);
        const day = dateInfo[0] != null ? Number(dateInfo[0]): today.getDate();
        const month = dateInfo[1] != null ? months.findIndex(x => x.includes(dateInfo[1].replace('.',''))) : today.getMonth();
        const year = dateInfo[2] != null ? Number(dateInfo[2]) : today.getFullYear();
        return new Date(year, month, day, Number(time.split(':')[0]), Number(time.split(':')[1]));
    }

    static dateToLocalISO(date: Date) {
        const off = date.getTimezoneOffset()
        const absoff = Math.abs(off)
        return (new Date(date.getTime() - off * 60 * 1000).toISOString().substr(0, 23) +
            (off > 0 ? '-' : '+') +
            Math.floor(absoff / 60).toFixed(0).padStart(2, '0') + ':' +
            (absoff % 60).toString().padStart(2, '0'))
    }

    static getTimeDetails(time: number, callback?: (d: number, h: number, m: number, s: number) => any) {
        let seconds = Math.abs(Math.floor( (time / 1000)));

        let minutes = Math.floor(seconds/60);
        let hours = Math.floor(minutes/60);
        let days = Math.floor(hours/24);

        hours = hours-(days*24);
        minutes = minutes-(days*24*60)-(hours*60);
        seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);

        if(callback != null) {
            callback(days, hours, minutes, seconds);
        }

        return {
            days,
            hours,
            minutes,
            seconds
        };
    }
}