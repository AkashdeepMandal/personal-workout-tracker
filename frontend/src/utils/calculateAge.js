import moment from "moment";

export const calculateAge = (date) => {
  const fullyear = moment(date).format(moment.HTML5_FMT.DATE);
  const age = moment().diff(fullyear, "years", false);
  return age;
};
