import { expect, test } from 'vitest';
import { tokenType } from '../src/lexer/token.js';
import { Lexer } from '../src/lexer/lexer.js';
import { openFile, debug } from './util.js';

test('test lexer with step1/valid.json', async () => {
    const input = await openFile('./test/data/step1/valid.json');

    const expected = [
        { expectedType: tokenType.LBRACE, expectedLiteral: '{' },
        { expectedType: tokenType.RBRACE, expectedLiteral: '}' },
        { expectedType: tokenType.EOF, expectedLiteral: '' },
    ];

    const l = new Lexer(input);

    expected.forEach(({ expectedType, expectedLiteral }) => {
        const tok = l.nextToken();

        expect(tok.type).toBe(expectedType);
        expect(tok.literal).toBe(expectedLiteral);
    });
});

test('test lexer with step1/invalid.json', async () => {
    const input = await openFile('./test/data/step1/invalid.json');

    const expected = [{ expectedType: tokenType.EOF, expectedLiteral: '' }];

    const l = new Lexer(input);

    expected.forEach(({ expectedType, expectedLiteral }) => {
        const tok = l.nextToken();

        expect(tok.type).toBe(expectedType);
        expect(tok.literal).toBe(expectedLiteral);
    });
});

test('test lexer with step2/valid.json', async () => {
    const input = await openFile('./test/data/step2/valid.json');

    const expected = [
        { expectedType: tokenType.LBRACE, expectedLiteral: '{' },
        { expectedType: tokenType.STRING, expectedLiteral: 'key' },
        { expectedType: tokenType.COLON, expectedLiteral: ':' },
        { expectedType: tokenType.STRING, expectedLiteral: 'value' },
        { expectedType: tokenType.RBRACE, expectedLiteral: '}' },
        { expectedType: tokenType.EOF, expectedLiteral: '' },
    ];

    const l = new Lexer(input);

    expected.forEach(({ expectedType, expectedLiteral }) => {
        const tok = l.nextToken();

        expect(tok.type).toBe(expectedType);
        expect(tok.literal).toBe(expectedLiteral);
    });
});

test('test lexer with step2/valid2.json', async () => {
    const input = await openFile('./test/data/step2/valid2.json');

    const expected = [
        { expectedType: tokenType.LBRACE, expectedLiteral: '{' },
        { expectedType: tokenType.STRING, expectedLiteral: 'key' },
        { expectedType: tokenType.COLON, expectedLiteral: ':' },
        { expectedType: tokenType.STRING, expectedLiteral: 'value' },
        { expectedType: tokenType.COMMA, expectedLiteral: ',' },
        { expectedType: tokenType.STRING, expectedLiteral: 'key2' },
        { expectedType: tokenType.COLON, expectedLiteral: ':' },
        { expectedType: tokenType.STRING, expectedLiteral: 'value' },
        { expectedType: tokenType.RBRACE, expectedLiteral: '}' },
        { expectedType: tokenType.EOF, expectedLiteral: '' },
    ];

    const l = new Lexer(input);

    expected.forEach(({ expectedType, expectedLiteral }) => {
        const tok = l.nextToken();

        expect(tok.type).toBe(expectedType);
        expect(tok.literal).toBe(expectedLiteral);
    });
});

test('test lexer with step2/invalid.json', async () => {
    const input = await openFile('./test/data/step2/invalid.json');

    const expected = [
        { expectedType: tokenType.LBRACE, expectedLiteral: '{' },
        { expectedType: tokenType.STRING, expectedLiteral: 'key' },
        { expectedType: tokenType.COLON, expectedLiteral: ':' },
        { expectedType: tokenType.STRING, expectedLiteral: 'value' },
        { expectedType: tokenType.COMMA, expectedLiteral: ',' },
        { expectedType: tokenType.RBRACE, expectedLiteral: '}' },
        { expectedType: tokenType.EOF, expectedLiteral: '' },
    ];

    const l = new Lexer(input);

    expected.forEach(({ expectedType, expectedLiteral }) => {
        const tok = l.nextToken();

        expect(tok.type).toBe(expectedType);
        expect(tok.literal).toBe(expectedLiteral);
    });
});

test('test lexer with bool/valid.json', async () => {
    const input = await openFile('./test/data/bool/valid.json');

    const expected = [
        { expectedType: tokenType.LBRACE, expectedLiteral: '{' },
        { expectedType: tokenType.STRING, expectedLiteral: 'key1' },
        { expectedType: tokenType.COLON, expectedLiteral: ':' },
        { expectedType: tokenType.BOOLEAN, expectedLiteral: 'true' },
        { expectedType: tokenType.COMMA, expectedLiteral: ',' },
        { expectedType: tokenType.STRING, expectedLiteral: 'key2' },
        { expectedType: tokenType.COLON, expectedLiteral: ':' },
        { expectedType: tokenType.BOOLEAN, expectedLiteral: 'false' },
        { expectedType: tokenType.RBRACE, expectedLiteral: '}' },
        { expectedType: tokenType.EOF, expectedLiteral: '' },
    ];

    const l = new Lexer(input);

    expected.forEach(({ expectedType, expectedLiteral }) => {
        const tok = l.nextToken();

        expect(tok.type).toBe(expectedType);
        expect(tok.literal).toBe(expectedLiteral);
    });
});

test('test lexer with bool/invalid.json', async () => {
    const input = await openFile('./test/data/bool/invalid.json');

    const expected = [
        { expectedType: tokenType.LBRACE, expectedLiteral: '{' },
        { expectedType: tokenType.STRING, expectedLiteral: 'key1' },
        { expectedType: tokenType.COLON, expectedLiteral: ':' },
        { expectedType: tokenType.BOOLEAN, expectedLiteral: 'true' },
        { expectedType: tokenType.COMMA, expectedLiteral: ',' },
        { expectedType: tokenType.STRING, expectedLiteral: 'key2' },
        { expectedType: tokenType.COLON, expectedLiteral: ':' },
        { expectedType: tokenType.ILLEGAL, expectedLiteral: 'F' },
        { expectedType: tokenType.ILLEGAL, expectedLiteral: 'a' },
        { expectedType: tokenType.ILLEGAL, expectedLiteral: 'l' },
        { expectedType: tokenType.ILLEGAL, expectedLiteral: 's' },
        { expectedType: tokenType.ILLEGAL, expectedLiteral: 'e' },
        { expectedType: tokenType.RBRACE, expectedLiteral: '}' },
        { expectedType: tokenType.EOF, expectedLiteral: '' },
    ];

    const l = new Lexer(input);

    expected.forEach(({ expectedType, expectedLiteral }) => {
        const tok = l.nextToken();

        expect(tok.type).toBe(expectedType);
        expect(tok.literal).toBe(expectedLiteral);
    });
});

test('Test number whole valid ./data/num/valid1.json', async () => {
    const input = await openFile('./test/data/number/valid1.json');

    const expected = [
        { expectedType: tokenType.LBRACE, expectedLiteral: '{' },
        { expectedType: tokenType.STRING, expectedLiteral: 'key1' },
        { expectedType: tokenType.COLON, expectedLiteral: ':' },
        { expectedType: tokenType.NUMBER, expectedLiteral: '12000' },
        { expectedType: tokenType.COMMA, expectedLiteral: ',' },
        { expectedType: tokenType.STRING, expectedLiteral: 'key2' },
        { expectedType: tokenType.COLON, expectedLiteral: ':' },
        { expectedType: tokenType.NUMBER, expectedLiteral: '-9120' },
        { expectedType: tokenType.COMMA, expectedLiteral: ',' },
        { expectedType: tokenType.STRING, expectedLiteral: 'key3' },
        { expectedType: tokenType.COLON, expectedLiteral: ':' },
        { expectedType: tokenType.NUMBER, expectedLiteral: '0' },
        { expectedType: tokenType.RBRACE, expectedLiteral: '}' },
        { expectedType: tokenType.EOF, expectedLiteral: '' },
    ];

    const l = new Lexer(input);

    expected.forEach(({ expectedType, expectedLiteral }) => {
        const tok = l.nextToken();

        expect(tok.type).toBe(expectedType);
        expect(tok.literal).toBe(expectedLiteral);
    });
});

test('Test number decimal valid ./data/number/valid2.json', async () => {
    const input = await openFile('./test/data/number/valid2.json');

    const expected = [
        { expectedType: tokenType.LBRACE, expectedLiteral: '{' },
        { expectedType: tokenType.STRING, expectedLiteral: 'key1' },
        { expectedType: tokenType.COLON, expectedLiteral: ':' },
        { expectedType: tokenType.NUMBER, expectedLiteral: '0.999999' },
        { expectedType: tokenType.COMMA, expectedLiteral: ',' },
        { expectedType: tokenType.STRING, expectedLiteral: 'key2' },
        { expectedType: tokenType.COLON, expectedLiteral: ':' },
        { expectedType: tokenType.NUMBER, expectedLiteral: '-91.20' },
        { expectedType: tokenType.COMMA, expectedLiteral: ',' },
        { expectedType: tokenType.STRING, expectedLiteral: 'key3' },
        { expectedType: tokenType.COLON, expectedLiteral: ':' },
        { expectedType: tokenType.NUMBER, expectedLiteral: '63.102011' },
        { expectedType: tokenType.RBRACE, expectedLiteral: '}' },
        { expectedType: tokenType.EOF, expectedLiteral: '' },
    ];

    const l = new Lexer(input);

    expected.forEach(({ expectedType, expectedLiteral }) => {
        const tok = l.nextToken();

        expect(tok.type).toBe(expectedType);
        expect(tok.literal).toBe(expectedLiteral);
    });
});

test('Test number whole invalid ./data/number/invalid1.json', async () => {
    const input = await openFile('./test/data/number/invalid1.json');

    const expected = [
        { expectedType: tokenType.LBRACE, expectedLiteral: '{' },
        { expectedType: tokenType.STRING, expectedLiteral: 'key1' },
        { expectedType: tokenType.COLON, expectedLiteral: ':' },
        { expectedType: tokenType.NUMBER, expectedLiteral: '00' },
        { expectedType: tokenType.RBRACE, expectedLiteral: '}' },
        { expectedType: tokenType.EOF, expectedLiteral: '' },
    ];

    const l = new Lexer(input);

    expected.forEach(({ expectedType, expectedLiteral }) => {
        const tok = l.nextToken();

        expect(tok.type).toBe(expectedType);
        expect(tok.literal).toBe(expectedLiteral);
    });
});

test('test null data type ./data/null/valid.js', async () => {
    const input = await openFile('./test/data/null/valid.json');

    const expected = [
        { expectedType: tokenType.LBRACE, expectedLiteral: '{' },
        { expectedType: tokenType.STRING, expectedLiteral: 'key' },
        { expectedType: tokenType.COLON, expectedLiteral: ':' },
        { expectedType: tokenType.NULL, expectedLiteral: 'null' },
        { expectedType: tokenType.RBRACE, expectedLiteral: '}' },
        { expectedType: tokenType.EOF, expectedLiteral: '' },
    ];

    const l = new Lexer(input);

    expected.forEach(({ expectedType, expectedLiteral }) => {
        const tok = l.nextToken();

        expect(tok.type).toBe(expectedType);
        expect(tok.literal).toBe(expectedLiteral);
    });
});
