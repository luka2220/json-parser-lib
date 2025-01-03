import { tokenType, Token } from './token.js';

/** Lexer takes in JSON source code and turns it into tokens **/
export class Lexer {
    /** Creates a lexer
     * @param {string} input
     * @param {number} position
     * @param {number} readPos
     * @param {string} ch
     */
    constructor(input) {
        this.input = input;
        this.position = 0;
        this.readPosition = 0;

        this.#readChar();
    }

    /**
     * nextToken gets and returns the next token from the input
     * @returns {Token}
     */
    nextToken() {
        let token;

        this.#skipWhitespace();

        switch (this.ch) {
            case ',':
                token = this.#newToken(tokenType.COMMA, this.ch);
                break;
            case '{':
                token = this.#newToken(tokenType.LBRACE, this.ch);
                break;
            case '}':
                token = this.#newToken(tokenType.RBRACE, this.ch);
                break;
            case '[':
                token = this.#newToken(tokenType.LSQBRACKET, this.ch);
                break;
            case ']':
                token = this.#newToken(tokenType.RSQBRACKET, this.ch);
                break;
            case ':':
                token = this.#newToken(tokenType.COLON, this.ch);
                break;
            case '"':
                let str = this.#readString();
                token = this.#newToken(tokenType.STRING, str);
                break;
            case 't':
            case 'f':
                const boolResult = this.#readBool();

                if (boolResult !== null) {
                    return this.#newToken(tokenType.BOOLEAN, boolResult);
                }
            case 'n':
                const result = this.#readNull();

                if (result !== null) {
                    return this.#newToken(tokenType.NULL, result);
                }
            case 0:
                token = this.#newToken(tokenType.EOF, '');
                break;
            default:
                if (this.#isNumber(this.ch)) {
                    const num = this.#readNumber();
                    token = this.#newToken(tokenType.NUMBER, num);
                    return token;
                }

                token = this.#newToken(tokenType.ILLEGAL, this.ch);
                break;
        }

        this.#readChar();
        return token;
    }

    /** Advances the position in the lexer and get the next char from the input */
    #readChar() {
        if (this.readPosition >= this.input.length) {
            this.ch = 0; // set to ascii null
        } else {
            this.ch = this.input[this.readPosition];
        }

        this.position = this.readPosition;
        this.readPosition++;
    }

    /** #peek looks one position ahead of the input but does not advance the lexer
     * @returns {string | int}
     */
    peek() {
        if (this.readPosition >= this.input.length) {
            return 0;
        }

        return this.input[this.readPosition];
    }

    /**
     * #newToken creates a new token type
     * @param {tokenType} tokenType
     * @param {string} ch
     * @returns {Token}
     */
    #newToken(tokenType, ch) {
        return new Token(tokenType, ch);
    }

    /** #skipWhiteSpace advances the read position if the current chat is ' ', '\t', '\n', '\r' */
    #skipWhitespace() {
        while (
            this.ch === ' ' ||
            this.ch === '\t' ||
            this.ch === '\n' ||
            this.ch === '\r'
        ) {
            this.#readChar();
        }
    }

    /** #readString creates a string token by read all content from "..."
     * @returns {string}
     */
    #readString() {
        this.#readChar();
        let result = '';

        while (this.ch !== '"') {
            result += this.ch;
            this.#readChar();
        }

        return result;
    }

    /** #readBool creates a boolean token
     * @returns {string | null}
     */
    #readBool() {
        if (this.ch === 't') {
            let i = 0;
            const t = 'true';

            while (this.ch === t[i] && i < t.length) {
                i += 1;
                this.#readChar();
            }

            if (t.length === i) {
                return 'true';
            }
        } else if (this.ch === 'f') {
            let i = 0;
            const f = 'false';

            while (this.ch == f[i] && i < f.length) {
                i += 1;
                this.#readChar();
            }

            if (f.length === i) {
                return 'false';
            }
        }

        return null;
    }

    /** #isNumber checks if the current token is a number
     * @param {string} str current character token
     *  @returns {boolean}
     * */
    #isNumber(str) {
        if (typeof str !== 'string') return false;

        return (
            (str.charCodeAt() >= 48 && str.charCodeAt() <= 57) ||
            str.charCodeAt() === 45 ||
            str.charCodeAt() === 46
        );
    }

    /** #readNumber creates a number token
     * @returns {string}
     */
    #readNumber() {
        const pos = this.position;

        while (this.#isNumber(this.ch)) {
            this.#readChar();
        }

        return this.input.slice(pos, this.position);
    }

    /** #readNull creates a null token
     * @returns {string | null}
     */
    #readNull() {
        const need = 'null';
        let count = 0;

        while (count < need.length) {
            if (this.ch !== need[count]) {
                break;
            }

            count++;
            this.#readChar();
        }

        return count === need.length ? 'null' : null;
    }
}
