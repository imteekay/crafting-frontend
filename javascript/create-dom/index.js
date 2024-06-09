/**
 * Write a createDom function that takes in a required root parameter,
 * which is an object representation of a DOM tree's root node or a string
 * representation of a text node.
 *
 * If the root parameter is an object, then a DOM Element node is returned.
 * This object will have one required property: type, which corresponds to
 * the tag name of the element being created (e.g. "div"), as well as two
 * optional properties: children and attributes. If children exists, it will
 * be an array of objects in the same format as the root parameter.
 *
 * Each value in this array will be a child of the returned node,
 * in the order of the array. Additionally, if a child is a string instead
 * of an object, then that string should be used as text content.
 * If attributes exists, it will be an object, with each key corresponding
 * to an attribute name and each value corresponding to an attribute value.
 * These attributes are each attributes of the node.
 */

function createDom(root) {
  if (typeof root === 'string') {
    return document.createTextNode(root);
  }

  const rootDOM = document.createElement(root.type);

  if (root.attributes) {
    for (const [type, value] of Object.entries(root.attributes)) {
      rootDOM.setAttribute(type, value);
    }
  }

  if (root.children) {
    for (const child of root.children) {
      rootDOM.appendChild(createDom(child));
    }
  }

  return rootDOM;
}
