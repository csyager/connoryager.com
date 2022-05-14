import { CopyBlock, dracula } from "react-code-blocks";

function CodeSnippet({ code, language, showLineNumbers, startingLineNumber }) {
    return (
        <div className="code-block">
            <CopyBlock
                text={code}
                language={language}
                showLineNumbers={showLineNumbers}
                startingLineNumber={startingLineNumber}
                theme={dracula}
                codeBlock
            />
        </div>
    );
}

export default CodeSnippet;