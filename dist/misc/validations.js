"use strict";
exports.validateSchema = (schema, payload) => {
    const { error } = schema.validate(payload);
    const response = {
        success: true,
        message: null
    };
    if (error) {
        response.success = false;
        response.message = error.details[0].message;
    }
    return response;
};
