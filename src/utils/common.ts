import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import { toast } from 'sonner';
import { FILE_FORMAT, NUMBER_FORMAT_LOOK_UP } from './const';

dayjs.extend(timezone)
dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.extend(advancedFormat)

export const range = (start: number, end: number) => {
  const length = end - start + 1;
  /*
        Create an array of certain length and set the elements within it from
      start value to end value.
    */
  return Array.from({ length }, (_, idx) => idx + start);
};

export const currentNo = (no: number, page: number, limit: number) => {
  return no + 1 + (Number(page) - 1) * Number(limit);
};

export const validateFileFormat = (file: File, formatFile: string[] = FILE_FORMAT): boolean => {
  if (!file || typeof file === 'string') return true;
  return formatFile.includes(file.type);
};

export const checkFileSize = (file: File, size: number): boolean => {
  if (!file || typeof file === 'string') return true;
  return file.size <= size * 1024 * 1024;
};

export const validateFileSize = (file: File, size = 10): boolean => {
  if (!file || typeof file === 'string') return true;
  if (!file.size) return true;
  return file?.size <= size * 1024 * 1024;
};

export function shortenString(str?: string, length = 10) {
  if (!str) return '';
  if (str?.length <= length) return str;
  return `${str.substring(0, length)}...${str.substring(str.length - length)}`;
}

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const handleToastError = (error: any, defaultError = 'Something went wrong') => {
  console.error(error);
  toast.error(error?.shortMessage ?? error?.message ?? error?.cause?.message ?? defaultError);
};

export function numberFormatter(num: number, digits = 1) {
  const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
  const item = NUMBER_FORMAT_LOOK_UP.findLast((item) => num >= item.value);
  return item ? (num / item.value).toFixed(digits).replace(regexp, '').concat(item.symbol) : '0';
}

export const sleep = async (time: number) => {
  return new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve()
    }, time),
  )
}

export const getCountdownToTime = (endTime: string | undefined, format: 'HH:mm' | 'HH:mm:ss' = 'HH:mm'): string => {
  if (!endTime || !dayjs(endTime).isValid()) return format === 'HH:mm:ss' ? '00:00:00' : '00:00'

  const now = dayjs()
  const end = dayjs(endTime)

  const diff = end.diff(now)

  if (diff <= 0) {
    return format === 'HH:mm:ss' ? '00:00:00' : '00:00'
  }

  const duration = dayjs.duration(diff)
  const hours = Math.floor(duration.asHours()).toString().padStart(2, '0')
  const minutes = duration.minutes().toString().padStart(2, '0')
  const seconds = duration.seconds().toString().padStart(2, '0')

  if (format === 'HH:mm:ss') {
    return `${hours}:${minutes}:${seconds}`
  }

  return `${hours}:${minutes}`
}