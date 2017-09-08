export default class {
    static toFixed = (value, count = 1) => {
        return (parseInt(value * Math.pow(10, count) + 0.5) / Math.pow(10, count)).toString();
    }
}