import { expect, test } from 'vitest';
import { Parser } from '../src/parser/parser';

test('Basic parser test', () => {
  const input = `
    { "key": -1200,
      "key 2": 0.99999
    }
    `;

  // NOTE: Parser Design
  // - Parser.jsonToObj() should return an object with two fields:
  // Object (result): 
  //  * (valid): a boolean result stating wether the json is valid or not
  //  * (error): a string vaue stating why the json is invalid; null if valid is true
  const js = Parser.jsonToObj(input);
  expect(js.result.valid).toBe(true);
});
