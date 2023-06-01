import React, {useState} from 'react'
import './Home.scss'
import AllEpisodesQuery from "../../services/queries/AllEpisodesQuery";
import {useQuery} from "@apollo/client";
import MainLayout from "../../layouts/MainLayout";
import {Link} from "react-router-dom";
import {AllCharacterListQuery} from "../../services/queries/AllCharacterListQuery";
import EpisodesByCharacterIdQuery from "../../services/queries/EpisodesByCharacterIdQuery";

const Home = () => {

	const [selectedCharacter, setSelectedCharacter] = useState(null);
	const [showCharacters, setShowCharacters] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

	return (
		<MainLayout>
			<div className={'home'}>
				<div className={'d-flex justify-content-end character-toggler cursor-pointer'}
				     onClick={() => setShowCharacters(!showCharacters)}>
					{showCharacters ? 'Hide Characters' : 'Filter By Characters'}
				</div>
				{
					showCharacters && <CharacterList setSelectedCharacter={args => setSelectedCharacter(args)}
					                                 setShowCharacters={args => setShowCharacters(args)}/>
				}

				{selectedCharacter ?
					<CharacterBasedEpisodes selectedCharacter={selectedCharacter} currentPage={currentPage}
					                        setSelectedCharacter={args => setSelectedCharacter(args)}
					                        setCurrentPage={(args) => setCurrentPage(args)}/>
					:
					<AllEpisodesSection currentPage={currentPage} setCurrentPage={(args) => setCurrentPage(args)}/>
				}

			</div>
		</MainLayout>
	)
}

const AllEpisodesSection = ({currentPage, setCurrentPage}) => {
	const {loading, error, data} = useQuery(AllEpisodesQuery, {
		variables: {page: currentPage}
	});

	return <div className={'all-episodes-section'}>
		{loading && <p>Loading...</p>}
		{error ? <p>Error :(</p> :
			data?.episodes.results.map(({name, air_date, episode, id}) => (
					<EpisodeCard key={id} name={name} air_date={air_date} episode={episode} id={id}/>
				)
			)}
		{data?.episodes && <Pagination
			currentPage={currentPage}
			setCurrentPage={(args) => setCurrentPage(args)}
			info={data?.episodes.info}
		/>}
	</div>
}

const CharacterBasedEpisodes = ({selectedCharacter, setSelectedCharacter}) => {
	const {loading, error, data} = useQuery(EpisodesByCharacterIdQuery, {
		variables: {
			filter: {name: selectedCharacter}

		}
	});

	return <div className={'all-episodes-section'}>
		<div className={'d-flex justify-content-between'}>
			<h3>filtered by character : {selectedCharacter}</h3>
			<h4 onClick={() => setSelectedCharacter(null)} className={'cursor-pointer'}> Clear filter</h4>
		</div>
		{loading && <p>Loading...</p>}
		{error ? <p>Error :(</p> :
			data?.characters?.results[0]?.episode.map(({name, air_date, episode, id}) => (
					<EpisodeCard key={id} name={name} air_date={air_date} episode={episode} id={id}/>
				)
			)

		}
	</div>
}

export const CharacterList = ({setSelectedCharacter, setShowCharacters}) => {
	const [currentPage, setCurrentPage] = useState(1);

	const {loading, error, data} = useQuery(AllCharacterListQuery, {
		variables: {page: currentPage}
	});

	const selectionHandler = (name) => {
		setSelectedCharacter(name);
		setShowCharacters(false);
	}

	return <div className={'character-list-section'}>

		<div className={'characters-wrapper'}>

			<div className={'inner-wrap'}>
				<div className={'close-button'} onClick={() => setShowCharacters(false)}>
					close
				</div>
				{loading && <p>Loading...</p>}
				{error ? <h2>Error :(</h2> :
					<div className={'character-grid'}>
						{data?.characters.results.map(({name, id, image}) => (
							<div key={id} className={'character-card cursor-pointer'}
							     onClick={() => selectionHandler(name)}>
								<img src={image} alt={name}/>
								<p>{name}</p>
							</div>
						))}
					</div>}

				{!error && data?.characters && <Pagination
					currentPage={currentPage}
					setCurrentPage={(args) => setCurrentPage(args)}
					info={data?.characters.info}
				/>}

			</div>

		</div>

	</div>
}

export const Pagination = ({currentPage, setCurrentPage, info}) => {

	return <div className={'d-flex justify-content-between pagination-wrapper'}>
		<button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous
		</button>
		{/* show maximum last 3 previous page dynamically using array*/}




		{currentPage > 3 &&
			<button onClick={() => setCurrentPage(currentPage - 3)}>{currentPage - 3}</button>}
		{currentPage > 2 &&
			<button onClick={() => setCurrentPage(currentPage - 2)}>{currentPage - 2}</button>}
		{currentPage > 1 &&
			<button onClick={() => setCurrentPage(currentPage - 1)}>{currentPage - 1}</button>}
		{/* show current page*/}
		<button className={'current-page'} onClick={() => setCurrentPage(currentPage)}>{currentPage}</button>
		{/*check and show maximum next 3 page*/}
		{info.next && currentPage + 1 <= info.pages &&
			<button onClick={() => setCurrentPage(currentPage + 1)}>{currentPage + 1}</button>}
		{info.next && currentPage + 2 <= info.pages &&
			<button onClick={() => setCurrentPage(currentPage + 2)}>{currentPage + 2}</button>}
		{info.next && currentPage + 3 <= info.pages &&
			<button onClick={() => setCurrentPage(currentPage + 3)}>{currentPage + 3}</button>}

		<button onClick={() => setCurrentPage(currentPage + 1)}
		        disabled={currentPage === info.pages}>Next
		</button>
	</div>
}

export const EpisodeCard = ({id, name, episode, air_date}) => {
	return <div key={id} className={'episode-card'}>
		<div className={'d-flex justify-content-between align-items-center'}>
			<h3>{name}</h3>
			<Link to={'/episode-detail/' + id}>
				<p className={"mx-2"}>details >></p>
			</Link>
		</div>
		<h4>episode:{episode}</h4>
		<p>air_date: {air_date}</p>

	</div>
}

export default Home
