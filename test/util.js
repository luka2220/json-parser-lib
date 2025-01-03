import { readFile } from 'fs/promises';

/**
 * openFile opens a JSON file and prepeares it for testing
 * @param {string} pathJson - path to the JSON file
 * @returns {Promise<string>} - string representation of the JSON file
 */
export async function openFile(pathJson) {
    try {
        const data = await readFile(pathJson);
        return data.toString('utf-8');
    } catch (error) {
        throw new Error(`Unable to open file: ${error}`);
    }
}

/**
 * debug outputs expected values and recived values for debugging
 * @param {string} expected
 * @param {string} got
 */
export function debug(expected, got) {
    console.log('debug');
    console.log(`expected = ${expected}, got = ${got}`);
}
