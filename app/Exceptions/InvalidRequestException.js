'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class InvalidRequestException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error,{response}) {
    return response.status(403).json({
      error: 'Access not available to this resource'
    })
  }
}

module.exports = InvalidRequestException
