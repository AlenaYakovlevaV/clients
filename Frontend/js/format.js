import { contactTooltip } from "./createTooltip.js";
import { svgEmail, svgFb, svgOther, svgPhone, svgVk } from "./svg.js";

export const formatDate = (data) => {
    const newDate = new Date(data);
    const convertDate = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }

    const result = newDate.toLocaleString('ru', convertDate);

    return result;
}

export const formatTime = (data) => {
    const newTime = new Date(data);
    const convertTime = {
        hour: 'numeric',
        minute: 'numeric',
    }

    const result = newTime.toLocaleString('ru', convertTime);

    return result;
}

export const createContactLink = (type, value, element, svg, item) => {
    const setTooltip = contactTooltip(type, value);
    element = document.createElement('a');
    element.classList.add('contacts__link');
    element.innerHTML = svg;

    if (type === 'Email') {
        element.href = `mailto:${value.trim()}`;
    } else if (type === 'Телефон' || type === 'Доп. телефон') {
        element.href = `tel:${value.trim()}`;
        setTooltip.tooltipValue.style.color = 'var(--color-white)';
        setTooltip.tooltipValue.style.textDecoration = 'none';
    } else {
        element.href = value.trim();
    }

    element.append(setTooltip.tooltip);
    item.append(element);
}

export const createContactItemType = (type, value, item) => {
    switch (type) {
        case 'Телефон': 
            let phone;
            createContactLink(type, value, phone, svgPhone, item);
            break;
        case 'Доп. телефон': 
            let elcPhone;
            createContactLink(type, value, elcPhone, svgPhone, item);
            break;
        case 'Email':
            let Email;
            createContactLink(type, value, Email, svgEmail, item);
            break;
        case 'Vk':
            let Vk;
            createContactLink(type, value, Vk, svgVk, item);
            break;
        case 'Facebook':
            let Fb;
            createContactLink(type, value, Fb, svgFb, item);
            break;
        case 'Другое':
            let Other;
            createContactLink(type, value, Other, svgOther, item);
            break;
        
        default:
            break;
    }
}

