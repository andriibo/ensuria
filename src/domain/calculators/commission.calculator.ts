export class CommissionCalculator {
    calculatePaymentCommission(commissionA: number, commissionB: number, amount: number): number {
        return ~~(commissionA + (amount * commissionB / 100));
    }

    calculateMyCommission(commissionC: number, amount: number): number {
        return ~~(amount * commissionC / 100);
    }
}
