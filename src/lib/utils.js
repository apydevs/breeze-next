export function encodePayload(props) {
    const encodeToBase64 = (data) => Buffer.from(data).toString('base64');

    // Convert props to JSON string and add the salt key
    const dataToEncode = JSON.stringify(props) + process.env.NEXT_PUBLIC_SALT_KEY;

    // Return the encoded query object
    return { query: encodeToBase64(dataToEncode) };
}


// Retrieves and parses data from session storage
export function getSessionStore(key) {
    const storedData = sessionStorage.getItem(key);

    // Attempt to parse JSON and return null if parsing fails
    try {
        return storedData ? JSON.parse(storedData) : null;
    } catch (error) {
        console.error(`Error parsing session storage item with key "${key}":`, error);
        return null;
    }
}