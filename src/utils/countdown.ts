export default function countdown(date: string): string {
  let year = Number(date.slice(0, 4));
  let month = Number(date.slice(4, 6)); // 修改这行代码
  let day = Number(date.slice(6, 8));
  let isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0; // 判断闰年
  let daysOfMonth = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 每个月的天数
  day--;
  if (day === 0) { // 如果当月天数减到0，进入下一个月
    month--;
    if (month === 0) { // 如果月份减到0，进入下一年
      year--;
      month = 12;
    }
    day = daysOfMonth[month - 1]; // 当前月份的天数
  }
  const newDay = day < 10 ? '0' + day : day.toString(); // 天数补0
  const newMonth = month < 10 ? '0' + month : month.toString(); // 月份补0
  return year.toString() + newMonth + newDay; // 拼接为新的日期字符串
}
