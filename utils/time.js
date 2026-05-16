export function formatTime(timestamp) {
  const now = Date.now()
  const diff = now - timestamp

  // 时间单位（毫秒）
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour
  const month = 30 * day

  if (diff < minute) {
    return '1分钟'
  }

  if (diff < hour) {
    return Math.floor(diff / minute) + '分钟'
  }

  if (diff < day) {
    return Math.floor(diff / hour) + '小时'
  }

  if (diff < month) {
    return Math.floor(diff / day) + '天'
  }

  if (diff < 3 * month) {
    return Math.floor(diff / month) + '月'
  }

  return null
}