import moment from 'moment-timezone';
/**
 Helper for determining is current date in active dates.
 Return false if pattern doesn't have active dates information available
 or if current day is not found in active days
 * */
// eslint-disable-next-line import/prefer-default-export
export const isActiveDate = pattern => {
  if (!pattern || !pattern.activeDates) {
    return false;
  }

  const activeDates = pattern.activeDates.reduce((dates, activeDate) => {
    return dates.concat(activeDate.day);
  }, []);
  const now = moment().format('YYYYMMDD');
  return activeDates.indexOf(now) > -1;
};
