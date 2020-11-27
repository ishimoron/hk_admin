import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import News from './components/News';
import Drawer from './components/Drawer';
import Home from './components/Home';

import { NewsContext } from './context/news/NewsContext';
import NewsReducer from './context/news/NewsReducer';
import NewsState from './context/news/NewsState';
import NewsCreate from './modules/NewsCreate';

const App = () => {
	const [state, dispatch] = React.useReducer(NewsReducer, NewsState);

	return (
		<NewsContext.Provider value={{ state, dispatch }}>
			<Drawer />
			<Switch>
				<Route path="/news" component={News}></Route>
				<Route path="/" component={Home} exact></Route>
				<Route path="/create" component={NewsCreate} ></Route>
			</Switch>
		</NewsContext.Provider>
	);
};

export default App;
