import axios from "axios";
import { useState } from "react";
import styled from "styled-components"
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";

export const API_KEY = "1e6c7e9a";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  ${'' /* background: #032026; */}
`;
const Header = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
background-color: #025A6C;
color: white;
align-items: center;
padding: 10px
font-size: 25px;
font-weight: bold;
box-shadow: 0 3px 6px 0 #555;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MovieImage = styled.img`
  width: 100px;
  height: 30px;
  margin: 15px;

  `;

  const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  background-color: white;
  border-radius: 6px;
  margin-left: 20px;
  margin-right: 20px;
  width: 30%;
  background-color: white;
  align-items: center;
  `;

  const SearchIcon = styled.img`
  height: 32px;
  height: 32px;
  `;

  const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
  `;

  const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 24px;
  justify-content: space-evenly;
  `;

function App() {
  const [searchQuery, updateSearchQuery] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const fetchData = async (searchString) => {
  const response = await axios.get(`https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
  );
    updateMovieList(response.data.Search)
  };
  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value),500);
    updateTimeoutId(timeout)
  };
  return (
    <Container>
    <Header>
      <AppName>
      <MovieImage src="/logo gw.png"/>
      Multi Movie App
      </AppName>
     
      <SearchBox>
        <SearchIcon src="/search-icon.svg"/>
        <SearchInput 
          placeholder="Search Movie" 
          value={searchQuery} 
          onChange={onTextChange}
          />
      </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie}
        onMovieSelect={onMovieSelect}
      />}
     <MovieListContainer>
     {movieList?.length
     ? movieList.map((movie, index) => (
       <MovieComponent key={index} movie={movie} onMovieSelect={onMovieSelect}/>
       ))
     : "Mohon untuk lihat daftar movie, ketik di Search"}
       
     </MovieListContainer>
    </Container>
  );
}

export default App;
