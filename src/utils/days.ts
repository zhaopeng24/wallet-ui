import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
dayjs.extend(relativeTime);
dayjs.extend(duration);

declare module 'dayjs' {
  interface Dayjs {
    fromNow(withoutSuffix?: boolean): string
  }
}

export const timeToNow = (timestamp: number) => {
  return dayjs(new Date(timestamp * 1000).toLocaleString()).fromNow(true)
};