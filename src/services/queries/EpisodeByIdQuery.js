import {gql} from "@apollo/client";

export const EpisodeByIdQuery = gql`
	query EpisodesByIds($ids: [ID!]!) {
	  episodesByIds(ids: $ids) {
	    air_date
	    episode
	    id
	    name
	    characters {
	      name
	      id
	      image
	      location {
	        name
	      }
	    }
	  }
	}
	`

export default EpisodeByIdQuery