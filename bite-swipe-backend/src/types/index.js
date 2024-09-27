/**
 * @fileoverview Type definitions for the application
 */

/**
 * @typedef {Object} ServiceRegistry
 * @property {function(string, *): void} register - Register a service in the registry.
 * @property {function(string): *} get - Retrieve a service from the registry.
 * @property {function(string): boolean} has - Check if a service is registered in the registry.
 */

/**
 * @typedef {Object} Suggestion
 * @property {string} id - The unique identifier for the suggestion.
 * @property {string} name - The name of the suggestion.
 * @property {string} address - The address associated with the suggestion.
 * @property {string} image - The URL or path to the image for the suggestion.
 */

/**
 * @typedef {Object} SuggestionService
 * @property {function(): Promise<Suggestion[]>} getAllSuggestions - Retrieves all suggestions.
 * @property {function(Object, Object): Promise<Suggestion>} createSuggestion - Creates a new suggestion.
 */

/**
 * @typedef {import('express').Router} ExpressRouter
 */

/**
 * @typedef {Object} ValidationErrorDetail
 * @property {string} field - The name of the field that failed validation.
 * @property {string} message - The error message describing the validation failure.
 */

/**
 * @typedef {Object} ErrorResponse
 * @property {string} error - A general error message.
 * @property {ValidationErrorDetail[]} [details] - Optional array of validation error details.
 */

module.exports = {
  ValidationErrorDetail: {},
  ErrorResponse: {}
};