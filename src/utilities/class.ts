export function id<T>(x: T): T {
  return x;
}

export const cx = (
  ...classNames: (string | false | undefined | null)[]
): string => {
  return classNames.filter(id).join(' ');
};
