import {gql} from "@apollo/client";

const EpisodesByCharacterIdQuery = gql`
	query Characters($filter: FilterCharacter, $page: Int) {
	  characters(filter:$filter, page: $page) {
	    results {
	      episode {
	        episode
	        name
	        id
	        air_date
	      }
	    }
	    info {
	      count
	      next
	      pages
	      prev
	    }
	  }
	}
	
	`

export default EpisodesByCharacterIdQuery