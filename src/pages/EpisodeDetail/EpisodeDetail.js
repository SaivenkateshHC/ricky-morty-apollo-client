import React from 'react'
import './EpisodeDetail.scss'
import MainLayout from "../../layouts/MainLayout";
import {useNavigate, useParams} from "react-router";
import EpisodeByIdQuery from "../../services/queries/EpisodeByIdQuery";
import {useQuery} from "@apollo/client";

const EpisodeDetail = () => {
	const navigate = useNavigate();

	const backToSourceHandler = () => {
		navigate(-1)
	}
	return (
		<MainLayout>
			<div className={'episode-detail'}>
				<h3 className={'cursor-pointer'} onClick={backToSourceHandler}> Back</h3>
				<div className={'py-3'}>
					<EpisodeDetailSection/>
				</div>
			</div>
		</MainLayout>
	)
}

export const EpisodeDetailSection = () => {
	const params = useParams();
	const {loading, error, data} = useQuery(EpisodeByIdQuery, {variables: {ids: [params.id]}});

	return (<div className={'episode-detail-section'}>
		{loading && <p>Loading...</p>}
		{error ? <h2>Error :(</h2>
			:
			data?.episodesByIds.map(({name, air_date, episode, id, characters}) => (
				<div key={id} className={'episode-card'}>
					<div className={'d-flex justify-content-between align-items-center'}>
						<h3>{name}</h3>
					</div>
					<h4>episode:{episode}</h4>
					<p>air_date: {air_date}</p>
					<h4>Characters:</h4>
					<div className={'characters-section'}>
						{characters.map(({name, id, image, location}) => (
							<div key={id} className={'character-card'}>
								<img src={image} alt={name}/>
								<h5>{name}</h5>
								<p>location: {location.name}</p>
							</div>
						))}
					</div>
				</div>
			))}
	</div>)
}

export default EpisodeDetail
