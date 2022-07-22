import React from './index'

export type CreateElementReturn = ReturnType<typeof React.createElement>

export const eventAttributes: {
	[key: string]: keyof GlobalEventHandlers
} = {
	onClick: 'onclick',
	onChange: 'onchange',
} 