import { createElement } from './../utils/functions';

const dropdownItem = (item, appendTo) =>{

  createElement('li', { className: 'dropdown-item', href: '#'}, item, appendTo );
}

export { dropdownItem };