

export const getNextDayOfWeek = (date, dayOfWeek) => {
    var resultDate = new Date(date.getTime());
    resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay() - 1) % 7 +1);
    return resultDate;
}

