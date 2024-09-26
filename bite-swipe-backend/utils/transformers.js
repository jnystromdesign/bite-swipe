/**
 * Converts a string to kebab-case.
 * 
 * This function provides two methods of conversion:
 * 1. Simple (default): Handles camelCase, PascalCase, and snake_case inputs.
 * 2. Complex: Handles more intricate string patterns, including consecutive uppercase letters and numbers.
 * 
 * @param {string} str - The input string to be converted to kebab-case.
 * @param {boolean} [complex=false] - If true, uses the complex conversion method.
 * 
 * @returns {string} The kebab-case version of the input string.
 * 
 * @example
 * // Simple conversion (default)
 * toKebabCase("helloWorld");  // Returns "hello-world"
 * toKebabCase("HelloWorld");  // Returns "hello-world"
 * toKebabCase("hello_world"); // Returns "hello-world"
 * toKebabCase("hello world"); // Returns "hello-world"
 * 
 * // Complex conversion
 * toKebabCase("helloWorld", true);         // Returns "hello-world"
 * toKebabCase("HelloWorld", true);         // Returns "hello-world"
 * toKebabCase("HELLO_WORLD", true);        // Returns "hello-world"
 * toKebabCase("Hello123World", true);      // Returns "hello-123-world"
 * toKebabCase("XMLHttpRequest", true);     // Returns "xml-http-request"
 * toKebabCase("ABlongStringOFTEXT", true); // Returns "a-blong-string-oftext"
 */
function toKebabCase(str, complex=false) {
    if(complex){
        return str
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map(x => x.toLowerCase())
        .join('-');
    }
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  }
  
  module.exports = {
    toKebabCase
  };