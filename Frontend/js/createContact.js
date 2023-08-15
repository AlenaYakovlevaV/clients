import { svgDelete } from "./svg.js";

export const createContactItem = () => {
    const contact = document.createElement('div');
    const contactType = document.createElement('div');
    const contactName = document.createElement('button');
    const contactList = document.createElement('ul');
    const contactPhone = document.createElement('li');
    const contactEmail = document.createElement('li');
    const contactVk = document.createElement('li');
    const contactFb = document.createElement('li');
    const contactOther = document.createElement('li');
    const contactInput = document.createElement('input');
    const contactBtnDelete = document.createElement('button');
    const contactDeleteSpan = document.createElement('span');

    contact.classList.add('contact');
    contactType.classList.add('contact__type');
    contactName.classList.add('contact__name');
    contactList.classList.add('contact__list', 'list-reset');
    contactPhone.classList.add('contact__item');
    contactEmail.classList.add('contact__item');
    contactVk.classList.add('contact__item');
    contactFb.classList.add('contact__item');
    contactOther.classList.add('contact__item');
    contactInput.classList.add('contact__input');
    contactBtnDelete.classList.add('contact__delete', 'btn-reset');
    contactDeleteSpan.classList.add('contact-tooltip', 'site-tooltip', 'delete-tooltip');

    contactName.textContent = 'Телефон';
    contactPhone.textContent = 'Доп. телефон';
    contactEmail.textContent = 'Email';
    contactDeleteSpan.textContent = 'Удалить контакт';
    contactVk.textContent = 'Vk';
    contactFb.textContent = 'Facebook';
    contactOther.textContent = 'Другое';
    contactInput.placeholder = 'Введите данные контакта';
    contactInput.type = 'text';
    contactBtnDelete.innerHTML = svgDelete;

    contactBtnDelete.addEventListener('click', (e) => {
        e.preventDefault();
        contact.remove();
        document.querySelector('.modal__btn-contact').classList.add('modal__btn-contact--active');
    });

    contactName.addEventListener('click', (e) => {
        e.preventDefault();
        contactList.classList.toggle('contact__list--active');
        contactName.classList.toggle('contact__list--active');
    });

    contactType.addEventListener('mouseleave', () => {
        contactList.classList.remove('contact__list--active');
        contactName.classList.remove('contact__list--active');
    });

    const setType = (type) => {
        type.addEventListener('click', () => {
            contactName.textContent = type.textContent;
            contactList.classList.remove('contact__list--active');
            contactName.classList.remove('contact__list--active');
        });
    };

    const typesArr = [contactPhone, contactEmail, contactVk, contactFb, contactOther];

    for (const type of typesArr) {
        setType(type);        
    }

    contactBtnDelete.append(contactDeleteSpan);
    contact.append(contactType, contactInput, contactBtnDelete);
    contactType.append(contactName, contactList);
    contactList.append(contactPhone, contactEmail, contactVk, contactFb, contactOther);

    return {
        contact,
        contactName,
        contactInput,
        contactBtnDelete,
    }
}