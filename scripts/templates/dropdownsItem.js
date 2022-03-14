import { createElement } from './../utils/functions';

const dropdownItem = (item, appendTo) =>{

  createElement('div', {className: 'col dropdown-item-wrapper'}, undefined, appendTo);
  createElement('li', { className: 'dropdown-item'}, item, `${appendTo} div.dropdown-item-wrapper` ).setAttribute('data-dropdown-item', '');
}

export { dropdownItem };