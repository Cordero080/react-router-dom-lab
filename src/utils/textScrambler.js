// Utility function to scramble text with coding syntax
export function getScrambledText() {
  const codeSyntax = [
    'console.glitch("080");',
    "Math.random() * 1000;",
    "decrypt(mailbox);",
    'Be Real;',
    "brokenPromise(() => {});",
    "setInterval(() => {});",
    "document.wickedSelector();",
    "Array.from(new Set());",
    "Object.keys(data);",
    "dasEffect(() => {});",
    "console.I-AM();",
    "return { ...state };",
    "const [data] = useState();",
    "x => x + 1",
    "!isValid && throw Error",
    "{ There is no try }",
    "process.env.SECRET",
    "0xFA2E1F",
    "(() => true)()",
    "async function*()",
    "quantum.entangle()",
    "Router.teleport()",
    "cipher.encrypt()",
    "void 0x00FF",
    "buffer.allocate()",
    "while(true) break;",
  ];

  // Get random syntax snippets
  return codeSyntax[Math.floor(Math.random() * codeSyntax.length)];
}

// Character sets for scrambling
const chars = {
  letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "(){}[]<>=+-*/$.!?:;,'\"`&|_\\~",
};

// Get a random character from all available sets
export function getRandomChar() {
  const allChars = chars.letters + chars.numbers + chars.symbols;
  return allChars[Math.floor(Math.random() * allChars.length)];
}

// Generate a scrambled version of a string with some characters replaced
export function scrambleText(text) {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    // 70% chance to scramble each character
    if (Math.random() < 0.7) {
      result += getRandomChar();
    } else {
      result += text[i];
    }
  }
  return result;
}
