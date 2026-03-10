import { CopyBlock, dracula } from "react-code-blocks";

function CodeSnippet({ code, language, showLineNumbers, startingLineNumber, children }) {
	if (children) {
		return (
			<div className="code-block">
				<pre style={{
					background: "#282a36",
					color: "$f8f8f2",
					padding: '1em',
					borderRadius: '4px',
					fontFamily: 'monospace',
					fontSize: '0.875em',
					overflowX: 'auto',
					margin: 0
				}}>
					<code>{children}</code>
				</pre>
			</div>
		);
	}
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
