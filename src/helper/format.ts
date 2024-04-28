/**
 * 格式化日期时间为字符串
 * @param date - 要格式化的日期时间
 * @returns 格式化后的日期时间字符串，格式为 "YYYY-MM-DD HH:MM:SS"
 */
export const formatDate = (date: Date): string => {
  const yyyy = date.getFullYear();
  const mmNumber = date.getMonth() + 1; // 月份从0开始计算
  const ddNumber = date.getDate();
  const hhNumber = date.getHours();
  const minNumber = date.getMinutes();
  const ssNumber = date.getSeconds();

  // 将数字格式化为两位字符串
  const mm = mmNumber < 10 ? "0" + mmNumber : mmNumber.toString();
  const dd = ddNumber < 10 ? "0" + ddNumber : ddNumber.toString();
  const hh = hhNumber < 10 ? "0" + hhNumber : hhNumber.toString();
  const min = minNumber < 10 ? "0" + minNumber : minNumber.toString();
  const ss = ssNumber < 10 ? "0" + ssNumber : ssNumber.toString();

  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
};
