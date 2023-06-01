import {gql} from "@apollo/client";

const AllEpisodesQuery = gql`
	query AllEpisodesQuery($filter: FilterEpisode,$page: Int) {
		episodes(filter: $filter,page: $page) {
		     info {
			      count
			      next
			      pages
			      prev
			    }
		    results {
		      air_date
		      characters {
		        id
		        gender
		        image
		        name
		      }
		      created
		      episode
		      id
		      name
		    }
		  }
		}
	`;

export default AllEpisodesQuery