export class AmountBlockedCalculator {
    calculateAmountBlocked(blockingD: number, amount: number): number {
        return Math.round(amount * blockingD / 100);
    }
}
