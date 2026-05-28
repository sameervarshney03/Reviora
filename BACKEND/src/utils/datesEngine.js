const getRevisionDates = (gaps) => {

    const today = new Date();

    return gaps.map((gap) => {

        const pastDate = new Date(today);

        pastDate.setDate(
            today.getDate() - gap
        );

        return pastDate;
    });
};

module.exports = getRevisionDates;