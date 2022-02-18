import { createElement } from './../utils/functions';

const dropdownItem = (item, appendTo) =>{

  createElement('div', {className: 'col'}, undefined, appendTo);
  createElement('li', { className: 'dropdown-item', href: '#'}, item, `${appendTo} div.col` );
}

export { dropdownItem };