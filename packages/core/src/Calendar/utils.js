import moment from "moment";
import isNil from "lodash/isNil";
import { REPRESENTATION_VALUES } from "./enums";

/**
 * Constant with the number of weeks to be displayed on the calendar.
 */
export const CALENDAR_WEEKS = 6;

/**
 * Constant with the default locale that should be used as the default.
 */
export const DEFAULT_LOCALE = "en";

/**
 * Pads a string value with leading zeroes(0) until length is reached.
 * For example: zeroPad(5, 2) => "05".
 *
 * @param {number} value - Value to be padded.
 * @param {number} length - Length of the value after the padding is added.
 * @returns {string} The value as a string with the received amount of padding.
 */
export const zeroPad = (value, length) => `${value}`.padStart(length, "0");

/**
 * Returns the number of days in the month given a month and year.
 *
 * @param {number} month - Number of the month (1 to 12).
 * @param {number} year - Number of the year.
 * @returns {number} The number of days in a month for the received year.
 */
export const getMonthDays = (month, year) => new Date(year, month, 0).getDate();

/**
 * Gets the week day of the first day of a given month and year.
 * From 0 (Sunday) to 6 (Saturday).
 *
 * @param {number} month - Number of the month (1 to 12).
 * @param {number} year - Number of the year.
 * @returns {number} The zero indexed week day where 0 is Sunday (0 to 6).
 */
export const getMonthFirstWeekday = (month, year) => new Date(year, month - 1, 1).getDay();

/**
 * Checks if the received date is a valid date.
 *
 * @param {Date} date - The date to be validated.
 * @returns {boolean} A flag stating if the date is valid or not.
 */
export const isDate = (date) =>
  Object.prototype.toString.call(date) === "[object Date]" && !Number.isNaN(date.valueOf());

/**
 * Checks if two dates are in the same month and year.
 *
 * @param {Date} date1 - First date.
 * @param {Date} date2 - Second date.
 * @returns {boolean} A flag stating if the dates are in the same month and year or not.
 */
export const isSameMonth = (date1, date2) => {
  if (!(isDate(date1) && isDate(date2))) return false;

  return date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
};

/**
 * Checks if two dates are on the same day.
 *
 * @param {Date} date1 - First date.
 * @param {Date} date2 - Second date.
 * @returns {boolean} A flag stating if the dates are in the same day or not.
 */
export const isSameDay = (date1, date2) => {
  if (!(isDate(date1) && isDate(date2))) return false;

  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

/**
 * Formats the received date using the ISO format (YYYY-MM-DD).
 *
 * @param {Date} date - The date to be formatted.
 * @returns {string || null} The formatted date in ISO format.
 */
export const getDateISO = (date) => {
  if (!isDate(date)) return null;

  return [date.getFullYear(), zeroPad(date.getMonth() + 1, 2), zeroPad(date.getDate(), 2)].join(
    "-"
  );
};

/**
 * Returns an object with the previous month taking also into consideration the year.
 * For example the previous month of January 2000 will be December 1999.
 *
 * @param {number} month - Number of the month.
 * @param {number} year - Number of the year.
 * @returns {({month: number, year: number})} Object with new month and year defined.
 */
export const getPreviousMonth = (month, year) => {
  const prevMonth = month > 1 ? month - 1 : 12;
  const prevMonthYear = month > 1 ? year : year - 1;

  return { month: prevMonth, year: prevMonthYear };
};

/**
 * Returns an object with the next month taking also into consideration the year.
 * For example the next month of December 2000 will be January 2001.
 *
 * @param {number} month - Number of the month.
 * @param {number} year - Number of the year.
 * @returns {({month: number, year: number})} Object with new month and year defined.
 */
export const getNextMonth = (month, year) => {
  const nextMonth = month < 12 ? month + 1 : 1;
  const nextMonthYear = month < 12 ? year : year + 1;

  return { month: nextMonth, year: nextMonthYear };
};

const uppercaseFirstLetter = (monthName) => monthName[0].toUpperCase() + monthName.substring(1);

/**
 * Returns a list with the names of all the months localized in the received locale and representation value.
 *
 * @param {string} locale - The locale to be applied to the Intl format.
 * @param {string} [representationValue=REPRESENTATION_VALUES.LONG] - The locale to be applied to the Intl format.
 * @returns {Array} An array with all the months names.
 */
export const getMonthNamesList = (locale, representationValue = REPRESENTATION_VALUES.LONG) => {
  const options = {
    month: representationValue,
  };

  return [...new Array(12)].map((n, index) => {
    const auxDate = new Date(1970, index, 1);
    return uppercaseFirstLetter(Intl.DateTimeFormat(locale, options).format(auxDate));
  });
};

/**
 * Returns a list with the names of all the weekdays localized in the received locale and representation value.
 *
 * @param {string} locale - The locale to be applied to the Intl format.
 * @param {string} representativeValue - The locale to be applied to the Intl format.
 * @returns {Array} An array with all the weekday names.
 */
export const getWeekdayNamesList = (locale, representativeValue = REPRESENTATION_VALUES.LONG) => {
  const weekdayNames = [];
  for (let day = 4; day <= 10; day += 1) {
    weekdayNames.push(
      new Date(1970, 0, day).toLocaleString(locale, {
        weekday: representativeValue,
      })
    );
  }
  return weekdayNames;
};

/**
 * Returns the name of the month for the supplied month localized in the received locale and representation value.
 *
 * @param {number} monthIndex - Month which we want to retrieve the name. (0 January ... 11 December).
 * @param {string} locale - The locale to be applied to the Intl format.
 * @param {string} [representationValue=REPRESENTATION_VALUES.LONG] - The locale to be applied to the Intl format.
 * @returns {string} The name of the month.
 */
export const getMonthName = (
  date = new Date(),
  locale,
  representationValue = REPRESENTATION_VALUES.LONG
) => new Intl.DateTimeFormat(locale, { month: representationValue }).format(date);

/**
 * Formats the received date according to Design System specifications.
 * Currently: day month, year => `14 Aug, 2019`.
 *
 * @param {date} date - Date to be formatted.
 * @param {string} locale - The locale to be applied to the Intl format.
 * @returns {string} The formatted date as a string.
 */
export const getFormattedDate = (date, locale, rep = REPRESENTATION_VALUES.SHORT) =>
  `${date.getDate()} ${getMonthName(date, locale, rep)} ${date.getFullYear()}`;
/**
 * Creates an array of 42 days. The complete current month and enough days from the previous and next months to fill
 * the 42 positions.
 *
 * @param {number} month - The number of the month (1 to 12).
 * @param {number} year - The number of the year.
 * @returns {Array} The array of dates.
 */
export const createDatesArray = (month, year) => {
  // Initializes the variables needed to calculate the dates for the received month and year
  const monthDays = getMonthDays(month, year);
  const daysFromPrevMonth = getMonthFirstWeekday(month, year);
  const daysFromNextMonth = CALENDAR_WEEKS * 7 - (daysFromPrevMonth + monthDays);
  const prevMonthYear = getPreviousMonth(month, year);
  const nextMonthYear = getNextMonth(month, year);
  const prevMonthDays = getMonthDays(prevMonthYear.month, prevMonthYear.year);

  // Creates the arrays for the dates for previous, current and next months
  const prevMonthDates = [...new Array(daysFromPrevMonth)].map((n, index) => {
    const day = index + 1 + (prevMonthDays - daysFromPrevMonth);
    return new Date(prevMonthYear.year, prevMonthYear.month - 1, day);
  });
  const currentMonthDates = [...new Array(monthDays)].map((n, index) => {
    const day = index + 1;
    return new Date(year, month - 1, day);
  });
  const nextMonthDates = [...new Array(daysFromNextMonth)].map((n, index) => {
    const day = index + 1;
    return new Date(nextMonthYear.year, nextMonthYear.month - 1, day);
  });

  return [...prevMonthDates, ...currentMonthDates, ...nextMonthDates];
};

/**
 * Checks if the received locale is valid according to Intl.
 *
 * @param {string} locale - The locale to be checked
 * @returns {boolean} - True if the locale is valid, false otherwise.
 */
export const isValidLocale = (locale) => {
  try {
    if (Intl.DateTimeFormat.supportedLocalesOf(locale).length > 0) {
      return true;
    }
    // eslint-disable-next-line no-console
    console.warn(`${locale} is not supported. Falling back to a known locale.`);
    return false;
  } catch (error) {
    if (error.name === "RangeError") {
      // eslint-disable-next-line no-console
      console.error(`Invalid locale: ${locale}`);
      return false;
    }
    // eslint-disable-next-line no-console
    console.error(error.message);
    return false;
  }
};

export const isRange = (date) => typeof date === "object" && "startDate" in date;

/**
 * Checks if the date falls within a specified date range.
 *
 * @param {Date} date - The date to be evaluated.
 * @param {object} providedValueRange - Provided selection range.
 * @returns {boolean} - True if the date falls within the range, false otherwise.
 */
export const dateInProvidedValueRange = (date, providedValueRange) => {
  const { startDate, endDate } = providedValueRange;

  if (!isRange(providedValueRange) || isNil(endDate)) return false;
  const localEndDate = endDate;

  const modStartDate = moment(startDate).format("YYYY-MM-DD");
  const modEndDate = moment(localEndDate).format("YYYY-MM-DD");

  const convertedDate = moment(date).format("YYYY-MM-DD");

  return convertedDate >= modStartDate && convertedDate <= modEndDate;
};

export const checkIfDateIsDisabled = (date, minimumDate, maximumDate) => {
  if (!minimumDate && !maximumDate) return false;
  const modStartDate = minimumDate ? moment(minimumDate).format("YYYY-MM-DD") : undefined;
  const modEndDate = maximumDate ? moment(maximumDate).format("YYYY-MM-DD") : undefined;

  const convertedDate = moment(date).format("YYYY-MM-DD");

  return convertedDate < modStartDate || convertedDate > modEndDate;
};
