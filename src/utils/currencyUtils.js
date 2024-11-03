export function toggleCurrency(currentSymbol) {
    return currentSymbol === '$' ? 'S/.' : '$';
}