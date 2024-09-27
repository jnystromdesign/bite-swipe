/**
 * @fileoverview Inversion of Control (IoC) serviceRegistry
 * This module provides a simple IoC serviceRegistry for dependency management.
 * 
 * @module ioc
 */

/**
 * Represents an IoC serviceRegistry for managing dependencies.
 * @class
 */
class ServiceRegistry {
    /**
     * Create a new IoC serviceRegistry.
     */
    constructor() {
        /**
         * @private
         * @type {Object.<string, *>}
         */
        this.services = {};
    }

    /**
     * Register a service in the serviceRegistry.
     * 
     * @param {string} name - The name to register the service under.
     * @param {*} instance - The service instance or factory function.
     * @throws {Error} If a service with the same name is already registered.
     * 
     * @example
     * // Registering a service instance
     * serviceRegistry.register('userService', new UserService());
     * 
     * @example
     * // Registering a factory function
     * serviceRegistry.register('dbConnection', () => new Database(config.dbUrl));
     */
    register(name, instance) {
        if (this.services[name]) {
            throw new Error(`Service '${name}' is already registered.`);
        }
        this.services[name] = instance;
    }

    /**
     * Retrieve a service from the serviceRegistry.
     * 
     * @param {string} name - The name of the service to retrieve.
     * @returns {*} The requested service instance.
     * @throws {Error} If the requested service is not found.
     * 
     * @example
     * const userService = serviceRegistry.get('userService');
     * userService.createUser({ name: 'John Doe' });
     */
    get(name) {
        if (!this.services[name]) {
            throw new Error(`Service '${name}' not found.`);
        }
        return typeof this.services[name] === 'function'
            ? this.services[name]()
            : this.services[name];
    }

    /**
     * Check if a service is registered in the serviceRegistry.
     * 
     * @param {string} name - The name of the service to check.
     * @returns {boolean} True if the service is registered, false otherwise.
     * 
     * @example
     * if (serviceRegistry.has('userService')) {
     *   console.log('UserService is available');
     * }
     */
    has(name) {
        return !!this.services[name];
    }
}

// Export a singleton instance of the serviceRegistry
module.exports = new ServiceRegistry();

/**
 * @typedef {Object} serviceRegistry
 * @property {function(string, *): void} register - Register a service in the serviceRegistry.
 * @property {function(string): *} get - Retrieve a service from the serviceRegistry.
 * @property {function(string): boolean} has - Check if a service is registered in the serviceRegistry.
 */