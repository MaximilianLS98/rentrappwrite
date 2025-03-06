const {
    currencyFormatter,
    totalRentProperty,
    totalRentOccupied,
    occupancyRateCalc,
    translateMaintenancePriority,
    translateMaintenanceStatus,
    translateOccupancyStatus,
} = require('@/utils/helpers');

describe('currencyFormatter', () => {
    it('should format number with decimals', () => {
        const result = currencyFormatter(1234.56, true);
        expect(result).toBe('kr 1 234,56');
    });

    it('should format number without decimals', () => {
        const result = currencyFormatter(1234, false);
        expect(result).toBe('kr 1 234');
    });

    it('should format zero with decimals', () => {
        const result = currencyFormatter(0, true);
        expect(result).toBe('kr 0,00');
    });

    it('should format zero without decimals', () => {
        const result = currencyFormatter(0, false);
        expect(result).toBe('kr 0');
    });

    it('should format negative number with decimals', () => {
        const result = currencyFormatter(-1234.56, true);
        expect(result).toBe('kr -1 234,56');
    });

    it('should format negative number without decimals', () => {
        const result = currencyFormatter(-1234, false);
        expect(result).toBe('kr -1 234');
    });
});
