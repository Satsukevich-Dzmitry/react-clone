import React from '../React'
import { CreateElementReturn } from '../React/types'

const ReactDom = (()=>{
	let rootElement: HTMLElement | null = null
	const renderRoot = (CT: ()=>CreateElementReturn, rootElement: HTMLElement) => {
		let C = CT()
		rootElement.replaceChildren(C)
	}

	const render = (CT: ()=>CreateElementReturn, rootSelector: string) => {
		if(rootElement === null) {
			rootElement = document.querySelector(rootSelector)
			if (!rootElement) throw new Error('No root element found')
		}

		renderRoot(CT, rootElement)

		setInterval(() => {
			const {needToUpdate, setIdxToZero, updateHooks} = React._InternalUpdate()
			setIdxToZero()
			if (needToUpdate) {
				renderRoot(CT, rootElement!)
			}
			updateHooks()
		}, 300)
	}
	return {
		render,
	}
})()

export default ReactDom