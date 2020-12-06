import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./styles.css";

function App() {
	const [value, setValue] = useState("");
	const [items, setItems] = useState([]);

	const handleAdd = () => {
		const newItem = {
			id: uuidv4(),
			value,
			checked: false,
		};

		setItems([...items, newItem]);
		setValue("");
	};

	const handleCheck = (itemId) => {
		setItems([
			...items.map((item) => {
				if (item.id === itemId) {
					item.checked = !item.checked;
				}

				return item;
			}),
		]);
	};

	return (
		<>
			<ul>
				{items.map((item) => (
					<li key={item.id} className={item.checked ? "checked" : ""}>
						<input
							data-testid="check-item"
							type="checkbox"
							value={item.checked}
							onChange={() => handleCheck(item.id)}
						/>
						{item.value}
					</li>
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
