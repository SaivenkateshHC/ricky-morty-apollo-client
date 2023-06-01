import React, {Suspense, useEffect, useState} from 'react'
import {Routes, Route} from 'react-router-dom';
import EpisodeDetail from "../pages/EpisodeDetail/EpisodeDetail";

const Home = React.lazy(() => import( "../pages/Home/Home"));

const CombinedRoutes = () => {
	const [initialRenderComplete, setInitialRenderComplete] = useState(false);

	useEffect(() => {
		// Updating a state causes a re-render
		setInitialRenderComplete(true);
	}, []);
	// initialRenderComplete will be false on the first render and true on all following renders
	if (!initialRenderComplete) {
		// Returning null will prevent the component from rendering, so the content will simply be missing from
		// the server HTML and also wont render during the first client-side render.
		return null;
	} else {

		return (
			<Suspense fallback={<div>Loading ... </div>}>
				<Routes>
					<Route path={'/'} element={<Home/>}/>
					<Route path={'/episode-detail/:id'} element={<EpisodeDetail/>}/>
				</Routes>
			</Suspense>
		)
	}
}

export default CombinedRoutes