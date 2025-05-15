export function formatChatTime(timestamp: string) {
  const date = new Date(timestamp);
  const now = new Date();

  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const oneDay = 24 * 60 * 60 * 1000;
  const diff =
    todayStart.getTime() -
    new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

  if (diff <= 0) {
    // 今天
    return date.toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } else if (diff <= oneDay) {
    return `昨天 ${date.toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })}`;
  } else if (diff <= 2 * oneDay) {
    return `前天 ${date.toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })}`;
  } else if (diff < 7 * oneDay) {
    const weekdayNames = [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
    ];
    return weekdayNames[date.getDay()];
  } else {
    return date
      .toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(/\//g, "-");
  }
}
