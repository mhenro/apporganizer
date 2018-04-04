export const getHost = () => {
    return 'http://localhost:8080/';
};

export const formatDate = (date, formatter = 'D/M/Y h:m:s') => {
    let year = date.getFullYear() + '',
        month = (date.getMonth() + 1) + '',
        day = date.getDate() + '',
        hour = date.getHours() + '',
        min = date.getMinutes() + '',
        sec = date.getSeconds() + '';

    return formatter.replace('D', addLeadZero(day)).replace('M', addLeadZero(month)).replace('Y', year).replace('h', addLeadZero(hour)).replace('m', addLeadZero(min)).replace('s', addLeadZero(sec));
};

export const addLeadZero = (n, width = 2, z = '') => {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};