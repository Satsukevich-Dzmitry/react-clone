
import React from './React'
import ReactDom from './React-dom'
import './style.css'
const Input = () => {
	const [text, setText] = React.useState('Initial text')

	const handleChange = (e: InputEvent) => {
		setText((e.target as HTMLInputElement).value)
	}

	const input = React.createElement('input', { onChange: handleChange, value: text, className: 'form-control' })
	const h2 = React.createElement('h2', null, text)

	return React.createElement('section', null, input, h2)
}

const buttonDiv = (...buttons: HTMLButtonElement[]) => {
	return React.createElement('div', { className: 'buttons-div' }, ...buttons)
}

const Counter = () => {
	const [count, setCount] = React.useState(1)
	const [doubledCounter, setDoubledCounter] = React.useState(2)

	const increment = () => {
		setCount(count + 1)
	}

	const decrement = () => {
		setCount(count - 1)
	}

	const double = () => {
		setDoubledCounter(doubledCounter * 2)
	}

	const h1 = React.createElement('h1', { className: 'header' }, count)
	const h2 = React.createElement('h2', { className: 'header' }, doubledCounter)
	const incrementButton = React.createElement<HTMLButtonElement>('button', { onClick: increment, className: 'btn btn-success' }, '+')
	const doubleButton = React.createElement<HTMLButtonElement>('button', { onClick: double, className: 'btn btn-success' }, '*')
	const decrementButton = React.createElement<HTMLButtonElement>('button', { onClick: decrement, className: 'btn btn-danger' }, '-')

	return React.createElement('section', null, h1, h2, buttonDiv(incrementButton, doubleButton, decrementButton))
}

const App = () => {
	return React.createElement('main', { className: 'main' }, Input(), Counter(), Counter())
}

ReactDom.render(App, '#app')
