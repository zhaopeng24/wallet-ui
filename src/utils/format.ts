export function formatAddress(address: string) {
  return address.slice(0, 4) + "..." + address.slice(-4);
}
export const formatValue = (s: string): string => {
  return Number(s).toFixed(2);
  if (s.length > 7) {
    return s.slice(0, 7);
  }
  return s;
};
