export function formatTime(date) {
    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();
    let seconds = date.getUTCSeconds();
    let milliseconds = date.getUTCMilliseconds();

    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    if (milliseconds < 10) {
        milliseconds = '0' + milliseconds;
    } else if (milliseconds > 99) {
        milliseconds = +Math.round(milliseconds / 10);
        if (milliseconds === 100) {
            milliseconds = 10;
        }
    }

    return {hours, minutes, seconds, milliseconds};
}