import { CodeBlock, nord } from 'react-code-blocks';
import { FC, useEffect, useState } from 'react';
import { Resizable } from 're-resizable';

interface Props {
	codeCodeBlock: string;
	languageCodeBlock?: string;
	showLineNumbersCodeBlock?: boolean;
}

const CustomCodeBlock = ({ codeCodeBlock, languageCodeBlock, showLineNumbersCodeBlock }: Props) => {
	const [language, setLanguage] = useState(languageCodeBlock ? languageCodeBlock : 'jsx');
	const [showLineNumbers, setShowLineNumbers] = useState(showLineNumbersCodeBlock ? showLineNumbersCodeBlock : true);

	return (
		<Resizable defaultSize={{ width: 'auto', height: '400px' }} data-test="codeResizable">
			<CodeBlock
				text={codeCodeBlock}
				customStyle={{
					height: '100%',
					width: '100%',
					overflow: 'scroll',
				}}
				language={language}
				theme={nord}
				showLineNumbers={showLineNumbers}
				data-test="codeBlock"
			/>
		</Resizable>
	);
};
export default CustomCodeBlock;
