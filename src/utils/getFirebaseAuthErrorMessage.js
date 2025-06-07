export const getFirebaseAuthErrorMessage = (error) => {
    if (!error) return "Something went wrong. Please try again.";

    switch (error) {
        case "EMAIL_EXISTS":
            return "This email is already registered.";
        case "TOO_MANY_ATTEMPTS_TRY_LATER":
            return "Too many attempts. Try again later.";
        default:
            return "Something went wrong. Please try again.";
    }
};
