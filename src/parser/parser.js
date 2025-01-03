import { Token } from "../lexer/token";
import { Lexer } from "../lexer/lexer";

/**
 * Parser is used to check if the input json is valid or not; runs the parser on the input string 
 * @class
 * */
export class Parser {
    /**
     * jsonToObj() runs the parser on the provided json string input
     * @param {string} input - JSON input 
     * @returns {object}
     * */
    static jsonToObj(input) {
        const parser = new Parser();
        const tokens = parser.#createTokens(input);

        return new Object(tokens);
    }

    /**
     * #createTokens uses the lexer to create an array tokens from the input string
     * @param {string} input
     * @returns {Array<Token>}
     * */
    #createTokens(input) {
        const lexer = new Lexer(input);
        const tokens = [];

        while (1) {
            const token = lexer.nextToken();

            // TODO: Do someething with an illegal token, throw an error
            tokens.push(token);

            if (token.type === 'EOF') break;
        }

        return tokens
    }
}
