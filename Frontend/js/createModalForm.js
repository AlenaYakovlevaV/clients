import { createContactItem } from "./createContact.js";
import { svgSpinner, svgAddContactDefault, svgAddContactHover } from "./svg.js";

export const createClients = () => {
    const modalTitle = document.createElement('h2');
    const modalClose = document.createElement('button');
    const form = document.createElement('form');
    const inputSurname = document.createElement('input');
    const inputName = document.createElement('input');
    const inputLastname = document.createElement('input');
    const labelSurname = document.createElement('label');
    const labelName = document.createElement('label');
    const labelLastname = document.createElement('label');
    const spanSurname = document.createElement('span');
    const spanName = document.createElement('span');
    const addContactBtn = document.createElement('button');
    const addContactBtnSvgDefault = document.createElement('span');
    const addContactBtnSvgHover = document.createElement('span');
    const saveBtn = document.createElement('button');
    const cancelBtn = document.createElement('button');
    const contactsBlock = document.createElement('div');
    const formFloatingSurname = document.createElement('div');
    const formFloatingName = document.createElement('div');
    const formFloatingLastname = document.createElement('div');
    const errorBlock = document.createElement('p');
    const unacceptableLetter = document.createElement('span');
    const emptySurname = document.createElement('span');
    const emptyName = document.createElement('span');
    const emptyLastname = document.createElement('span');
    const emptyValue= document.createElement('span');
    const emptyContacts = document.createElement('span');
    const spinner = document.createElement('span');

    spinner.classList.add('modal__spinner');
    modalTitle.classList.add('modal__title');
    modalClose.classList.add('modal__close', 'btn-reset');
    form.classList.add('modal__form');
    formFloatingSurname.classList.add('form-floating');
    formFloatingName.classList.add('form-floating');
    formFloatingLastname.classList.add('form-floating');
    inputSurname.classList.add('modal__input');
    inputName.classList.add('modal__input');
    inputLastname.classList.add('modal__input');
    labelSurname.classList.add('modal__label');
    labelName.classList.add('modal__label');
    labelLastname.classList.add('modal__label');
    spanSurname.classList.add('modal__label');
    spanName.classList.add('modal__label');
    addContactBtn.classList.add('modal__btn-contact', 'modal__btn-contact--active');
    addContactBtnSvgDefault.classList.add('btn-contact__svg', 'btn-contact__svg--default', 'btn-contact__svg--active');
    addContactBtnSvgHover.classList.add('btn-contact__svg', 'btn-contact__svg--hover');
    saveBtn.classList.add('modal__btn-save', 'btn-reset', 'site-btn');
    cancelBtn.classList.add('modal__btn-cancel', 'btn-reset');
    contactsBlock.classList.add('modal__contact');

    labelSurname.for = 'floatingSurname';
    labelName.for = 'floatingName';
    labelLastname.for = 'floatingLastname';

    inputSurname.id = 'floatingSurname';
    inputName.id = 'floatingName';
    inputLastname.id = 'floatingLastname';
    errorBlock.classList.add('modal__error');
    unacceptableLetter.id = 'unacceptableLetter';
    emptySurname.id = 'emptySurname';
    emptyName.id = 'emptyName';
    emptyLastname.id = 'emptyLastname';
    emptyValue.id = 'emptyValue';
    emptyContacts.id = 'emptyContacts';

    inputSurname.type = 'text'; 
    inputName.type = 'text'; 
    inputLastname.type = 'text';

    inputSurname.placeholder = 'Фамилия';
    inputName.placeholder = 'Имя';
    inputLastname.placeholder = 'Отчество';

    modalTitle.textContent = 'Новый клиент';
    labelSurname.textContent = 'Фамилия';
    labelName.textContent = 'Имя';
    labelLastname.textContent = 'Отчество';
    addContactBtn.textContent = 'Добавить контакт';
    saveBtn.textContent = 'Сохранить';
    cancelBtn.textContent = 'Отмена';
    spanName.textContent = '*';
    spanSurname.textContent = '*';

    spinner.innerHTML = svgSpinner;
    addContactBtnSvgDefault.innerHTML = svgAddContactDefault;
    addContactBtnSvgHover.innerHTML = svgAddContactHover;

    saveBtn.append(spinner);
    labelSurname.append(spanSurname);
    labelName.append(spanName);
    formFloatingName.append(inputName, labelName);
    formFloatingSurname.append(inputSurname, labelSurname);
    formFloatingLastname.append(inputLastname, labelLastname);
    contactsBlock.append(addContactBtn);
    errorBlock.append(emptySurname, emptyName, emptyLastname, emptyValue, unacceptableLetter, emptyContacts);
    form.append(formFloatingSurname, formFloatingName, formFloatingLastname, contactsBlock, errorBlock, saveBtn, cancelBtn);
    addContactBtn.append(addContactBtnSvgDefault, addContactBtnSvgHover);

    addContactBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const contactsItems = document.getElementsByClassName('contact');

        if (contactsItems.length < 9) {
            const contactItem = createContactItem();
            contactsBlock.prepend(contactItem.contact);
            contactsBlock.style.backgroundColor = 'rgba(200, 197, 209, .2)';
            if (contactsItems.length >= 8) {
                document.querySelector('.site-modal__content').style.top = '60%';
            } else {
                document.querySelector('.site-modal__content').style.top = '50%';
            }
        } else {
            const contactItem = createContactItem();
            contactsBlock.prepend(contactItem.contact);
            addContactBtn.classList.remove('modal__btn-contact--active');
        }
    })

    addContactBtn.addEventListener('mousemove', () => {
        addContactBtnSvgDefault.classList.remove('btn-contact__svg--active'); /*btn-contact__svg--default */
        addContactBtnSvgHover.classList.add('btn-contact__svg--active'); /* btn-contact__svg--hover */
    });

    addContactBtn.addEventListener('mouseleave', () => {
        addContactBtnSvgDefault.classList.add('btn-contact__svg--active'); /*btn-contact__svg--default */
        addContactBtnSvgHover.classList.remove('btn-contact__svg--active'); /* btn-contact__svg--hover */
    });

    return {
        form,
        modalClose,
        modalTitle,
        cancelBtn,
        inputName,
        inputSurname,
        inputLastname,
        labelName,
        labelSurname,
        labelLastname,
        contactsBlock,
        addContactBtn,
    }
}