import { createElement } from '../utils/functions';

const tagItem = (itemName) => {

  createElement('div', { className: 'tag d-flex justify-content-beetween' }, itemName, '[data-tags-container]').setAttribute('data-tag', '');
  createElement('i', { className: 'bi bi-x-circle', tabindex: '0', ariaLabel: `Supprimer le tag ${itemName}` }, undefined, '[data-tag]').setAttribute('data-icon-delete', '');
}

export { tagItem };