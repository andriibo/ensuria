export class AmountBlockedCalculator {
    calculateAmountBlocked(blockingD: number, amount: number): number {
        return ~~(amount * blockingD / 100);
    }
}
