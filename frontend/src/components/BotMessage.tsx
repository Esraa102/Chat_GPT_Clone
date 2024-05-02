import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeFromString(value: string) {
  if (value.includes("```")) {
    const extractedCode = value.split("```");
    return extractedCode;
  }
}

function isCodeBlock(str: string) {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("//") ||
    str.includes("#")
  )
    return true;
  else return false;
}

function extractLanguage(block: string) {
  const programmingLanguagesPattern =
    /(JavaScript|Java|Python|C\+\+|C#|Ruby|PHP|Swift|Objective-C|Kotlin|TypeScript)/gi;
  const language = block.match(programmingLanguagesPattern);
  if (language) {
    return language[0].toLocaleLowerCase();
  }
}

const BotMessage = ({ message }: { message: { content: string } }) => {
  const messageBlocks = extractCodeFromString(message.content);

  return (
    <div className="w-full my-8 flex justify-start">
      <div className="bg-slate-900 max-w-full rounded-lg rounded-es-none  px-4 py-3 md:text-lg text-gray-300">
        {!messageBlocks && <div className="my-3">{message.content}</div>}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <div className="my-3 max-w-full overflow-x-auto rounded-md">
                <SyntaxHighlighter
                  language={extractLanguage(block)}
                  style={coldarkDark}
                >
                  {block}
                </SyntaxHighlighter>
              </div>
            ) : (
              <div className="my-3">{block}</div>
            )
          )}
      </div>
    </div>
  );
};

export default BotMessage;

// const message = {
//   content: `
//   To declare a function in JavaScript, you can use the 'function' keyword followed by the function name and parentheses for parameters. Here's an example:

//   \`\`\`javascript
//   function greet(name) {
//     console.log('Hello, ' + name + '!');
//   }

//   greet('John'); // This will print 'Hello, John!' to the console.
//   \`\`\`

//   You can then call this function by using its name followed by parentheses and passing any required arguments. For example:

//  \`\`\`javascript
//  greet('John'); // This will print 'Hello, John!' to the console.
//   `,
// };
