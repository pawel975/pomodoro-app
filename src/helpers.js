/**
 * Stops program from continue for particular time
 *
 * @param {number} time in seconds to wait
 * @returns promise which resolves after minute
 */

export const sleep = async (time) => {
    return await new Promise(r => setTimeout(r, time));
}

/**
 * Converts 1 digit long time part to have 0 prefix
 *
 * @param {number} timePart hours/minutes/seconds to add 0 before if part is only 1 digit long
 * @return {string} formated timepart
 */
export const formatTimePart = (timePart) => {

    timePart = timePart < 10 ? `0${timePart}` : timePart;

    return timePart;
}

/**
 * Returns time formated to hh/mm/ss.
 *
 * @param {number} time in seconds
 * @return {string} time in hh/mm/ss format
 */
export const formatTime = (time) => {

     let filteredTimeEls = [];

     if (time > 0) {
         // Split time into hours, minutes and seconds
         let hours = Math.floor(time / 3600);
         let minutes = Math.floor((time - (hours * 3600)) / 60); 
         let seconds = Math.floor(time - (hours * 3600) - (minutes * 60)); 
     
         let timeEls = [hours, minutes, seconds];
     
         // Filters time parts
         for (let i = 0; i < timeEls.length; i++) {
             if (timeEls[i]) {
                 filteredTimeEls.push(String(timeEls[i]));
                 for (let j = i + 1; j < timeEls.length; j++) {
                     filteredTimeEls.push(formatTimePart(timeEls[j]))
                 }
                 break
             }
         }
         
     } else if (time === 0) {
         filteredTimeEls.push(String(time))
     }

     const formattedTime = filteredTimeEls.join(":");

     return formattedTime;
}

/**
 * Converts value into (? h ? min) if it's time value or returns it without convertion if it doesn't 
 * @param {number} value to convert
 * @returns {string} converted value
 */
export const formatParam = (value, type="none") => {

    let convertedValue;

    if (type === "time") {

        if (value >= 60) {
            const hours = Math.floor(value / 60);
            const minutesLeft = value - (hours * 60);
    
            if (minutesLeft === 0) {
               convertedValue = `${hours} h`
            } else {
                convertedValue = `${hours} h ${minutesLeft} min`; 
            }
    
        } else {
            convertedValue = `${value} min`;
        }
    } else if (type === "none") {
        convertedValue = value;
    }

    return convertedValue;
}   

/**
 * Return time converted from seconds to minutes
 * @param {number} seconds 
 * @returns time converted to minutes
 */
export const formatSecondsToMinutes = (seconds) => {

    let convertedValue;

    if (seconds >= 60) {
        const minutes = Math.floor(seconds / 60);
        convertedValue = minutes
    } else {
        convertedValue = seconds;
    }

    return convertedValue;
}   

/**
 * Saves data to local storage at particular key
 * @param {String} key is name of key in localStorage 
 * @param {String} dataToSave is data which we want to store at key
 */
export const saveToLocalStorage = (key, dataToSave) => {
    localStorage.setItem(key, JSON.stringify(dataToSave))
}

/**
 * 
 * @param {String} key is name of key in localStorage 
 * @returns data get from key position in localStorage
 */
export const getFromLocalStorage = (key) => {
    
    let fetchedData;

    if (localStorage.getItem(key)) {
        fetchedData = JSON.parse(localStorage.getItem(key));
    }
    
    return fetchedData;
}

/**
 * 
 * @param {number} startInTimeStamp is timestamp of starting day of generated week, if there is no value passed it gets current day as a starting point 
 * @returns array of last 7 days including today in dd/mm format
 */
export const getLastWeek = (startInTimeStamp) => {
    const lastWeek = []
    const today = startInTimeStamp ? startInTimeStamp : new Date().getTime();

    for (let i = 0; i < 7; i++) {
        const date = new Date(today - (i * 24*60*60*1000))
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        const formattedDate = `${day}.${month}`;
        lastWeek.push(formattedDate)
    }

    return lastWeek;
}