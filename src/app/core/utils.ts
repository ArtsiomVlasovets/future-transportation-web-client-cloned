export class Utils {
    static addLeadingZero(number: number): string {
        return ("0" + number).slice(-2);
    }

    static unixTimestampToDate(unixTimeStamp: number): Date {
        return new Date(unixTimeStamp * 1000);
    }

    static timestampHasNoTime(unixTimeStamp: number): boolean {
        const date = Utils.unixTimestampToDate(unixTimeStamp);
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();
        return hours === 0 && minutes === 0 && seconds === 0;
    }
}