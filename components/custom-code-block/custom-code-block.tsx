import { CodeBlock, nord } from 'react-code-blocks';
import { FC, useEffect, useState } from 'react';
import { Resizable } from 're-resizable';

interface props {
	code: string;
	startWidth?: number;
	startHeight?: number;
	language?: string;
	showLineNumbers?: boolean;
}

const CustomCodeBlock: FC<props> = (props) => {
	const [resizeWidth, setResizeWidth] = useState(props.startWidth ? props.startWidth : 400);
	const [resizeHeight, setResizeHeight] = useState(props.startHeight ? props.startHeight : 400);
	const [language, setLanguage] = useState(props.language ? props.language : 'jsx');
	const [showLineNumbers, setShowLineNumbers] = useState(props.showLineNumbers ? props.showLineNumbers : true);

	useEffect(() => {
		!props.startWidth && setResizeWidth(window.innerWidth - 100);
	}, [props.startWidth]);

	return (
		<Resizable
			size={{ width: resizeWidth, height: resizeHeight }}
			onResize={(e, direction, ref, d) => {
				setResizeWidth(ref.clientWidth);
				setResizeHeight(ref.clientHeight);
			}}
		>
			<CodeBlock
				text={props.code}
				customStyle={{
					height: '100%',
					width: '100%',
					overflow: 'scroll',
				}}
				language={language}
				theme={nord}
				showLineNumbers={showLineNumbers}
			/>
		</Resizable>
	);
};
export default CustomCodeBlock;
