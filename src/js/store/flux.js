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
			planets:[],
			starships:[],
			favorites:[],
		},
		actions: {
			// Use getActions to call a function within a fuction
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
			loadCharacters: debounce(async ()=>{
				try { 
					const response = await fetch('https://www.swapi.tech/api/people');
					const data = response.json();
					const results = data.results;

					const characters = [];
					const delay = (ms) => new promise (resolve => setTimout(resolve, ms));

					for (let i= 0; i < results.length; i++){
						try {
							const charactersResponse = await fetch(`https://www.swapi.tech/api/people/${results[i].uid}`);
							if (!charactersResponse.ok){
								throw new Error(`fail to fetch character's id:${results[i].uid}`)
							}
							const charactersData = await charactersResponse.json(); 
							characters.push(charactersData.result)
						} catch (error) {
							console.error("error fetching character:", error);
						}
					}
				} catch (error) {
					console.error("error fetching characters:", error)
				}
			}, 300),
		}
	};
};

export default getState;
