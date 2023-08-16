import { svgSpinner } from "./svg.js";

// Модальное окно удаления контакта
export const deleteClientModal = () => {
    const deleteModalContent = document.createElement('div');
    const modalClose = document.createElement('button');
    const deleteModalTitle = document.createElement('h2');
    const deleteModalText = document.createElement('p');
    const deleteModal =  document.createElement('div');
    const modalBtnDelete = document.createElement('button');
    const modalBtnBack = document.createElement('button');
    const deleteSpinner = document.createElement('span');

    deleteModal.classList.add('delete-modal', 'site-modal', 'modal-active');
    deleteModalContent.classList.add('delete-modal__content', 'site-modal__content', 'modal-active');
    deleteModalTitle.classList.add('delete-modal__title', 'modal__title');
    deleteModalText.classList.add('delete-modal__text');
    modalClose.classList.add('modal__close', 'btn-reset');
    modalBtnBack.classList.add('delete-modal__back', 'btn-reset');
    modalBtnDelete.classList.add('delete-modal__delete', 'btn-reset', 'site-btn');
    deleteSpinner.classList.add('modal__spinner');

    deleteModalTitle.textContent = 'Удалить клиента';
    deleteModalText.textContent = 'Вы действительно хотите удалить данного клиента?';
    modalBtnBack.textContent = 'Отмена';
    modalBtnDelete.textContent = 'Удалить';
    deleteSpinner.innerHTML = svgSpinner;

    modalBtnDelete.append(deleteSpinner);
    deleteModalContent.append(modalClose, deleteModalTitle, deleteModalText, modalBtnDelete, modalBtnBack);
    deleteModal.append(deleteModalContent);

    // Закрытие модального окна удаления контакта
    modalClose.addEventListener('click', () => deleteModal.remove());
    modalBtnBack.addEventListener('click', () => deleteModal.remove());

    window.addEventListener('click', (e) => {
        if (e.target === deleteModal) {
            deleteModal.remove();
        }
    });

    return {
        deleteModal,
        deleteModalContent,
        modalBtnDelete,
        deleteSpinner,
    };
}