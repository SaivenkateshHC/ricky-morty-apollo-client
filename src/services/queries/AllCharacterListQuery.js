import {gql} from "@apollo/client";

export const AllCharacterListQuery = gql`
query Characters($page: Int) {
characters(page: $page) {
    info {
      count
      next
      pages
      prev
    }
    results {
      image
      name
      id
    }
  }	
  }
`