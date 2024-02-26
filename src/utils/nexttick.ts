import { noop } from "./util";

export const nexttick = (callback = noop) => {
  setTimeout(() => {
    callback();
  }, 0);
};
