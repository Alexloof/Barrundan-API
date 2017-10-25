

export const getSaturdayDate = () => {
    const today = new Date ()
    var resultDate = new Date(today.getTime());

    resultDate.setDate(today.getDate() + (7 + 6 - today.getDay()) % 7);

    return resultDate;
}