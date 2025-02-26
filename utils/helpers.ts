import { TUnit } from '@/constants/types/units';

export const currencyFormatter = (amount: number, decimals: boolean) => {
    return new Intl.NumberFormat('nb-NO', {
        style: 'currency',
        currency: 'NOK',
        minimumFractionDigits: decimals ? 2 : 0
    }).format(amount);
}

export const totalRentProperty = (units: TUnit[]) => {
    if (!units) return 0;
    return units.reduce((acc, unit) => acc + unit.monthlyrent, 0);
}

export const totalRentOccupied = (units: TUnit[]) => {
    if (!units) return 0;
    return units.reduce((acc, unit) => unit.status === 'occupied' ? acc + unit.monthlyrent : acc, 0);
}

export const occupancyRateCalc = (units: TUnit[]) => {
    if (!units) return { percentage: 0, occupied: 0, vacant: 0 };

    const occupiedUnits = units.filter(unit => unit.status !== 'vacant');
    const percentage = parseFloat(((occupiedUnits.length / units.length) * 100).toFixed(2));
    // return an object with the percentage and the number of occupied / vacant units
    return { percentage, occupied: occupiedUnits.length, vacant: units.length - occupiedUnits.length };
}

export const translateMaintenanceStatus = (status: string) => {
    switch (status) {
        case 'open':
            return 'Åpen';
        case 'inprogress':
            return 'Pågående';
        case 'closed':
            return 'Lukket';
        case 'backlog':
            return 'Etterslep';
        default:
            return status;
    }
}

export const translateMaintenancePriority = (priority: string) => {
    switch (priority) {
        case 'low':
            return 'Lav';
        case 'medium':
            return 'Middels';
        case 'high':
            return 'Høy';
        case 'critical':
            return 'Kritisk';
        default:
            return priority;
    }
}

export const translateOccupancyStatus = (status: string) => {
    switch (status) {
        case 'occupied':
            return 'Utleid';
        case 'vacant':
            return 'Ledig';
        default:
            return status;
    }
}