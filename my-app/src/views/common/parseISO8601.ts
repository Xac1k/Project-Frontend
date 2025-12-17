const monthNames = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];

export function parseISO8601(text: string, isMonthWord: boolean) {
  const [date, timeField] = text.split("T");
  const [time, timeZone] = timeField.split(/[+-]/g);
  const [hour, minut, _] = time.split(":");
  const [year, month, day] = date.split("-");

  let additionHour = "0";
  let additionMinut = "0";
  if (timeZone) {
    [additionHour, additionMinut] = timeZone.split(":");
  }
  const hourWithTimeZone = `${Number(hour) + Number(additionHour)}`;

  if (isMonthWord) {
    const monthNum = Number(month) - 1;
    const monthName = monthNames[monthNum];
    return { year, monthName, day, hourWithTimeZone, minut };
  }

  return { year, month, day, hourWithTimeZone, minut };
}
