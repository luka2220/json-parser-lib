import { Lexer } from './lexer/lexer.js';

process.stdin.on('connection', () => {
    console.log('JSON REPL Started');
    console.log('Press ctrl+c or type .exit to quit the REPL');
});

process.stdin.on('data', (data) => {
    const dataStr = data.toString(undefined, 0, data.length - 1);

    if (dataStr === '.exit') {
        process.exit(0);
    }

    const l = new Lexer(dataStr);

    while (1) {
        const token = l.nextToken();
        console.log(`{'${token.type}', '${token.literal}'}`);

        if (token.type === 'EOF') {
            break;
        }
    }

    console.log();
});
