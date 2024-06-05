export class CommissionCalculator {
    calculatePaymentCommission(commissionA: number, commissionB: number, amount: number): number {
        return Math.round(commissionA + (amount * commissionB / 100));
    }

    calculateMyCommission(commissionC: number, amount: number): number {
        return Math.round(amount * commissionC / 100);
    }
}
