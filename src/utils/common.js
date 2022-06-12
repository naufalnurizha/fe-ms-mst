export const parseInteger = number => {
    return isNaN(number) ? 0 : parseInt(number, 10);
}