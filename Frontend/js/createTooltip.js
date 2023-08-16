// Отображение подробных данных при наведении на элементы
export const contactTooltip = (type, value) => {
    const tooltip = document.createElement('div');
    const tooltipType = document.createElement('span');
    const tooltipValue = document.createElement('a');

    tooltip.classList.add('contact-tooltip', 'site-tooltip');
    tooltipType.classList.add('contact-tooltip__type');
    tooltipValue.classList.add('contact-tooltip__value');
    
    if (type === 'Телефон' || type === 'Доп. телефон') {
        tooltipType.style.display = 'none';
    } else {
        tooltipType.textContent = `${type}:`;
    }
    tooltipValue.textContent = value;

    tooltip.append(tooltipType, tooltipValue);

    return {
        tooltip,
        tooltipType,
        tooltipValue,
    }
}