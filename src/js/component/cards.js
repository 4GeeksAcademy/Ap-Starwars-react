import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import { Context } from "../store/appContext";
import { ids } from "webpack";

export const Cards = () => {
	const { actions, store } = useContext(Context)
	const isFavorite = (id) => {
		return store.favorites.some(
			fav => fav.item.id === id
		)
	}
	return (
		<div className="card" style={{ width: '18rem' }}>
			<img src="..." className="card-img-top" alt="..." />
			<div className="card-body">
				<h5 className="card-title">Card title</h5>
				<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
				<a href="#" className="btn btn-primary">Go somewhere</a>
			</div>
		</div>
	);
};
