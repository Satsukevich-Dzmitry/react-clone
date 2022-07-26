const MyReact = (() => {
	let useStateValues = []
	let stateIdx = 0

	const useState = (initialState) => {
		let state = useStateValues[stateIdx] !== undefined ? useStateValues[stateIdx] : initialState;
		const _i = stateIdx;
		const setState = (newState) => {
			useStateValues[_i] = newState;
		}
		stateIdx++;
		return [state, setState]
	}

	const render = (C) => {
		stateIdx = 0;
		const _C = C();
		_C.render()
		return _C
	}

	return { useState, render }
})()

const Component = (() => {
	const [val, setVal] = MyReact.useState(0)
	const [text, setText] = MyReact.useState('init')
	return {
		render: () => {
			console.log(val)
			console.log(text)
		},
		increment: () => {
			setVal(val + 1)
		},
		type: (text) => {
			setText(text)
		},
		internalComponent: (() => {
			const [internalVal, setInternalVal] = MyReact.useState(2)
			return {
				double: () => {
					console.log('internal counter', internalVal)
					setInternalVal(internalVal * 2)
				}
			}
		})()
	}
})


let testComponent = MyReact.render(Component)
testComponent.increment()
testComponent = MyReact.render(Component)
testComponent.type('hello')
testComponent = MyReact.render(Component)
testComponent.internalComponent.double()
testComponent = MyReact.render(Component)
testComponent.internalComponent.double()
testComponent = MyReact.render(Component)
testComponent.increment()
testComponent = MyReact.render(Component)