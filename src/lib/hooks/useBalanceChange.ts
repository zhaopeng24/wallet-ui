import dayjs from "dayjs";
import { useMemo } from "react";

const useBalanceChanges = (historyList: any[]) => {
  const balanceChanges = useMemo(() => {
    // 定义“现在”的起始时间
    const now = dayjs().startOf("day");
    const oneDayAgo = now.subtract(1, "day");
    const oneWeekAgo = now.subtract(1, "week");
    const oneMonthAgo = now.subtract(1, "month");

    // 定义时间段过滤
    const transactionsUpToNow = historyList.filter(
      (tx: { timeStamp: number }) => dayjs.unix(tx.timeStamp).isBefore(now)
    );
    const transactionsUpToOneDayAgo = historyList.filter(
      (tx: { timeStamp: number }) => dayjs.unix(tx.timeStamp).isAfter(oneDayAgo)
    );
    const transactionsUpToOneWeekAgo = historyList.filter(
      (tx: { timeStamp: number }) =>
        dayjs.unix(tx.timeStamp).isAfter(oneWeekAgo)
    );
    const transactionsUpToOneMonthAgo = historyList.filter(
      (tx: { timeStamp: number }) =>
        dayjs.unix(tx.timeStamp).isAfter(oneMonthAgo)
    );
    // 计算每个时间段的累积总额，根据 tradeDirection 来决定是累加还是累减
    const calculateTotal = (transactions: any[]) => {
      return transactions.reduce(
        (totals, tx) => {
          const value = parseFloat(tx.value);
          const amount = parseFloat(tx.amount);
          if (tx.tradeDirection === 2) {
            // tradeDirection=2时累加
            totals.totalValue += value;
            totals.totalAmount += amount;
          } else if (tx.tradeDirection === 1) {
            // tradeDirection=1时累减
            totals.totalValue -= value;
            totals.totalAmount -= amount;
          }
          return totals;
        },
        { totalValue: 0, totalAmount: 0 }
      );
    };
    
    // 格式化函数，确保正数前有+号，负数保持-号
    const formatChange = (num: number) => {
      return num === 0 ? "0" : num > 0 ? `+${num.toFixed(2)}` : num.toFixed(2);
    };
    // 获取总额
    const totalNow = calculateTotal(transactionsUpToNow);
    const totalDayAgo = calculateTotal(transactionsUpToOneDayAgo);
    const totalWeekAgo = calculateTotal(transactionsUpToOneWeekAgo);
    debugger;
    const totalMonthAgo = calculateTotal(transactionsUpToOneMonthAgo);


    // 计算变化
    const valueChangeDay = formatChange(totalDayAgo.totalValue);
    const amountChangeDay = formatChange(totalDayAgo.totalAmount);
    const valueChangeWeek = formatChange(totalWeekAgo.totalValue);
    const amountChangeWeek = formatChange(totalWeekAgo.totalAmount);
    const valueChangeMonth = formatChange(totalMonthAgo.totalValue);
    const amountChangeMonth = formatChange(totalMonthAgo.totalAmount);

    return {
      pastDay: {
        valueChange: valueChangeDay,
        amountChange: amountChangeDay,
      },
      pastWeek: {
        valueChange: valueChangeWeek,
        amountChange: amountChangeWeek,
      },
      pastMonth: {
        valueChange: valueChangeMonth,
        amountChange: amountChangeMonth,
      },
    };
  }, [historyList]);

  return balanceChanges;
};

export default useBalanceChanges;
