export const generatePostMethodHeader = (body: object) => {
    return {
        'Content-Type': 'application/json',
        'Content-Length': new TextEncoder().encode(JSON.stringify(body)).length,
    }
}