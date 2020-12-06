import React, { useState } from "react";

function App() {
	const [value, setValue] = useState("");
	const [items, setItems] = useState([]);

	const handleAdd = () => {
		setItems([...items, value]);
		setValue("");
	};

	return (
		<>
			<ul>
				{items.map((item, index) => (
					<li key={index}>{item}</li>
				))}
			</ul>

			<input
				autoFocus
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder="Add new item"
			/>

			<button onClick={handleAdd}>Add</button>
		</>
	);
}

export default App;
