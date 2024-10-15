// Example usage
/*
const userData = {
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    number: "1234567890",
    password: "password123",
    confirmPassword: "password123"
};
const validationErrors = validateSignup(userData);
*/


const signupValidator = {
    firstname: {
        required: true,
        minLength: 2,
        maxLength: 30,
        message: "First name must be between 2 and 30 characters."
    },
    lastname: {
        required: true,
        minLength: 2,
        maxLength: 30,
        message: "Last name must be between 2 and 30 characters."
    },
    username: {
        required: true,
        minLength: 3,
        maxLength: 20,
        message: "Username must be between 3 and 20 characters."
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Email must be a valid email address."
    },
    number: {
        required: true,
        pattern: /^\d{10}$/,
        message: "Number must be a 10-digit number."
    },
    password: {
        required: true,
        minLength: 8,
        message: "Password must be at least 8 characters."
    },
    confirmPassword: {
        required: true,
        match: 'password',
        message: "Passwords must match."
    }
};

function validateSignup(data) {
    const errors = {};

    for (const key in signupValidator) {
        const rules = signupValidator[key];
        const value = data[key];

        if (rules.required && !value) {
            errors[key] = `${key.toUpperCase()} is required.`;
        } else if (rules.minLength && value.length < rules.minLength) {
            errors[key] = rules.message;
        } else if (rules.maxLength && value.length > rules.maxLength) {
            errors[key] = rules.message;
        } else if (rules.pattern && !rules.pattern.test(value)) {
            errors[key] = rules.message;
        } else if (rules.match && value !== data[rules.match]) {
            errors[key] = rules.message;
        }
    }

    return errors;
}




const loginValidator = {};



export { validateSignup, loginValidator };