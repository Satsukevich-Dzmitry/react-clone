import { eventAttributes } from './types'

const React: {
	createElement: <T extends HTMLElement>(type: string, props: Record<string, any> | null, ...children: (string | number | Text | HTMLElement)[]) => T,
	useState: <T>(initialValue: T) => [T, (newValue: T) => void],
	_InternalUpdate(): {
		needToUpdate: boolean,
		setIdxToZero: ()=>void,
		updateHooks: ()=>void,
	}
} = (() => {
	let hooks: any[] = []
	let _prevHooks: any[] = []
	let idx = 0

	const useState = <T>(initialState: T): [T, (newValue: T)=>void] => {
		let state = hooks[idx] !== undefined ? hooks[idx] : initialState;
		const _idx = idx;
		const setState = (newState: T) => {
			hooks[_idx] = newState
		}
		idx++
		return [state, setState];
	}

	// const useEffect = (cb, depArr) => {
	// 	let hasChanged = true;
	// 	const oldDeps = hooks[idx] || null;
	// 	if (oldDeps) {
	// 		hasChanged = !depArr.every((dep, i) => Object.is(dep, oldDeps[i]))
	// 	}
	// 	if (hasChanged) cb()
	// }

	const createElement = <T extends HTMLElement>(type: string, props: Record<string, any> | null, ...children: (string | number | Text | HTMLElement)[]): T => {
		const element = document.createElement(type)
		if (props) {
			Object.keys(props).forEach(key => {
				if (eventAttributes[key as unknown as keyof typeof eventAttributes]) {
					(element[eventAttributes[key]] as any) = props[key]
				}
				else if (key === 'className') {
					props[key].split(' ').forEach((className: string) => element.classList.add(className))
				}
				else {
					element.setAttribute(key, props[key])
				}
			})
		}
		if (children.length > 0) {
			children.forEach(child => {
				if (typeof child === 'string' || typeof child === 'number') {
					child = document.createTextNode(child as string)
				}
				element.appendChild(child)
			})
		}

		return element as T
	}

	const arePrevAndCurrentHooksEqual = (prevHooks: any[], actualHooks: any[]) => {
		if (prevHooks.length !== actualHooks.length) return false
		for (let i = 0; i < prevHooks.length; i++) {
			if (prevHooks[i] !== actualHooks[i]) return false
		}
		return true
	}

	const _InternalUpdate = ()=>{
		return {
			needToUpdate: !arePrevAndCurrentHooksEqual(_prevHooks, hooks),
			setIdxToZero: ()=>{idx = 0},
			updateHooks: ()=>{_prevHooks = [...hooks]},
		}
	}

	return { useState, createElement, _InternalUpdate }
})()

export default React