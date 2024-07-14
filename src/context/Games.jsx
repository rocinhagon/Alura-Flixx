import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


const gamesApiUrl = 'http://localhost:3000/games'
const categoriesApiUrl = 'http://localhost:3000/categories'
export const GamesContext = createContext();
GamesContext.displayName = 'Games'

export default function GamesProvider({children}) {

    const [games, setGames] = useState([])
    
    useEffect(() =>{
        axios.get(gamesApiUrl)
            .then(response => {
                setGames(response.data)
            })
    },[])
    
    const [categories, setCategories] = useState([])
    
    useEffect(() =>{
        axios.get(categoriesApiUrl)
            .then(response =>{
                setCategories(response.data)
            })
    },[])
    
    const [selectedVideo, setSelectedVideo] = useState(null)
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
    
    
    return (
        <GamesContext.Provider value={{games, setGames, categories, setCategories, selectedVideo, setSelectedVideo,isCategoryModalOpen, setIsCategoryModalOpen}}>
            {children}
        </GamesContext.Provider>
    )
}

export function useGamesContext(){
    const{games, setGames} = useContext(GamesContext)
    const{categories, setCategories} = useContext(GamesContext)
    const{selectedVideo, setSelectedVideo} = useContext(GamesContext)
    const{isCategoryModalOpen, setIsCategoryModalOpen} = useContext(GamesContext)

    function editCard(game){
        game ? window.scrollTo(0,350): ''
        setSelectedVideo(game)
    }

     function addGame(game){
        axios
            .post(gamesApiUrl,{
                "title":game.title,
                "cover":game.cover,
                "link":game.link,
                "system":game.system,
                "description":game.description
            })
            .then((response)=>{
                setGames([...games, response.data])
                alert('Você adicionou o jogo com sucesso!')
            })
            .catch(() => console.log('Erro ao adicionar o jogo detectado. Favor, tentar novamente!'))
    }

    function updateGame(game){
        axios
            .put(`${gamesApiUrl}/${game.id}`,{
                "title":game.title,
                "cover":game.cover,
                "link":game.link,
                "system":game.system,
                "description":game.description
            })
            .then(()=>{
                setGames(games.map(thisgame => thisgame.id === game.id ? game : thisgame))
                alert('Você editou o jogo com sucesso!')
            })
            .catch(() => console.log('Houve um erro ao editar o jogo. Favor, tentar novamente'))
    }

    function deleteGame(game){        
        axios
            .delete(`${gamesApiUrl}/${game.id}`)
            .then(() =>{
                setGames(games.filter((thisGame) => thisGame.id !== game.id))
            })
            .catch(() => console.log('Problema ao deletar o jogo detectado. Favor, tentar novamente'))
    }

    

    return {
        games,
        categories,
        selectedVideo,
        isCategoryModalOpen,
        editCard,
        addGame,
        updateGame,
        deleteGame
    }
}

