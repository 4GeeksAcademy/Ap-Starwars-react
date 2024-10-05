const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			characters: [],
			planets: [],
			starships: [],
			favorites: [],
		},
		actions: {
			// Use getActions to call a function within a function
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			loadCharacters: async () => {
				try {
					const response = await fetch('https://www.swapi.tech/api/people');
					const data = await response.json();
					const results = data.results;

					setStore({ characters: results });
				} catch (error) {
					console.error("error fetching characters:", error);
				}
			},
			loadPlanets: async () => {
				try {
					const response = await fetch('https://www.swapi.tech/api/planets');
					const data = await response.json();
					const results = data.results;

					setStore({ planets: results });
				} catch (error) {
					console.error("error fetching planets:", error);
				}
			},
			loadStarships: async () => {
				try {
					const response = await fetch('https://www.swapi.tech/api/starships');
					const data = await response.json();
					const results = data.results;

					setStore({ starships: results });
				} catch (error) {
					console.error("error fetching starships:", error);
				}
			},
			// Add to Favorites
			addFavorites: (newFavorite) => {
				const store = getStore();
				const favorites = store.favorites;

				console.log("Adding to favorites:", newFavorite);

				const isFavoriteExists = favorites.some(favorite =>
					favorite.name === newFavorite.name && favorite.type === newFavorite.type
				);

				if (!isFavoriteExists) {
					console.log("Favorite not found, adding:", newFavorite);
					// Verificar que no se agregue de nuevo el character //
					// setStore({ favorites: [...getStore().favorites, newFavorite] })
					setStore({ favorites: [...favorites, newFavorite] })
				} else {
					console.log("Favorite already exists, not adding:", newFavorite);
				}
			},
			removeFavorites: (noFavorite) => {
				const resultado = getStore().favorites.filter((item) => item.name !== noFavorite);
				setStore({ favorites: resultado })
			}
		}
	};
};

export default getState;
