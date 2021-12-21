export const generatePostMethodHeader = (body: object) => {
    return {
        'Content-Type': 'application/json',
        'Content-Length': JSON.stringify(body).length,
    }
}