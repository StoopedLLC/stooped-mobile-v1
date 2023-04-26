/*
This file contains useful utility functions.
It contains the following methods:
    - formatIsoDate: format an ISO date string to a readable date string

*/

const formatIsoDate = (isoDate) => {
    /*
        This function formats an ISO date string to a readable date string.

        @param:
            - isoDate: an ISO date string

        @return:
            - a readable date string
    */
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'});
}

const getNumDays = (isoDate) => {
    /*
        This function calculates the number of days between the given date and today.

        @param:
            - isoDate: an ISO date string

        @return:
            - the number of days between the given date and today
    */
    const date = new Date(isoDate);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

const getNumHours = (isoDate) => {
    /*
        This function calculates the number of hours between the given date and today.

        @param:
            - isoDate: an ISO date string

        @return:
            - the number of hours between the given date and today
    */
    const date = new Date(isoDate);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    return diffHours;
}



export { 
    formatIsoDate,
    getNumDays,
    getNumHours,
};