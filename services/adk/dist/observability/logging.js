export function logInfo(message, context) {
    if (context) {
        console.log(message, context);
    }
    else {
        console.log(message);
    }
}
export function logError(message, error) {
    if (error) {
        console.error(message, error);
    }
    else {
        console.error(message);
    }
}
