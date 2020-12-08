import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Item from "./components/Item";

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

	const handleEdit = (itemId, value) => {
		setItems([
			...items.map((item) => {
				if (item.id === itemId) {
					item.value = value;
				}

				return item;
			}),
		]);
	};

	const handleDelete = (itemId) => {
		setItems([...items.filter((item) => item.id !== itemId)]);
	};

	return (
		<>
			<ul>
				{items.map((item) => (
					<Item
						key={item.id}
						item={item}
						handleCheck={handleCheck}
						handleEdit={handleEdit}
						handleDelete={handleDelete}
					/>
				))}
			</ul>

			<input
				autoFocus
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder="Add new item"
				data-testid="btn-add"
			/>

			<button onClick={handleAdd}>Add</button>
		</>
	);
}

export default App;
