import React from './React'

export type CreateElementReturn = ReturnType<typeof React.createElement>

export const eventAttributes: {
	[key: string]: keyof GlobalEventHandlers
} = {
	onClick: 'onclick',
	onChange: 'onchange',
} 