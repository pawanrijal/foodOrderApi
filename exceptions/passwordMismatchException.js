class passwordMismatchException extends Error {
    constructor() {
        super("Password and Confirm Password must be match");
        this.status = 403;
        this.message = "Password and Confirm Password must be match";
    }
}

module.exports = new passwordMismatchException();
