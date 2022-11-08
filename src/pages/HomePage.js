import React from "react";
import { useSearchParams } from 'react-router-dom';
import PropTypes from "prop-types";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import {deleteNote, getNotes} from "../utils/api";

function HomePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [notes, setNotes] = React.useState([]);
    const [keyword, setKeyword] = React.useState(() =>{
        return searchParams.get('keyword') || ''
    });

    React.useEffect(() =>{
        getNotes().then(({data}) =>{
            setNotes(data);
        });
    }, []);

 async function onDeleteHandler(id) {
    await deleteNote(id);

    const { data } = await getNotes();
    setNotes(data);
  }

  function onKeywordChangeHandler (keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(
      keyword.toLowerCase()
    );
  });

  return (
    <section>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <NoteList notes={filteredNotes} onDelete={onDeleteHandler} />
    </section>
  )
}

export default HomePage;




















//     const [searchParams, setSearchParams] = useSearchParams();
//     const keyword = searchParams.get('keyword');
//     function changeSearchParams(keyword) {
//       setSearchParams({ keyword });
//     }
   
//     return <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
//   }

// class HomePage extends React.Component {
//     constructor (props) {
//         super (props);

//         this.state = {
//             notes : [],
//             keyword : props.defaultKeyword || '',
//         }

//         this.onDeleteHandler = this.onDeleteHandler.bind(this);
//         this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
//     }


//     async componentDidMount(){
//         const {data} =await getNotes();

//         this.setState(() =>{
//             return{
//                 notes: data
//             }
//         })
//     }

//     async onDeleteHandler(id){
//         await deleteNote(id);
        
//         const {data} = await getNotes();
//         this.setState(()=> {
//             return{
//                 notes : data,
//             }
//         });
//     }

//     onKeywordChangeHandler(keyword) {
//         this.setState(() => {
//           return {
//             keyword,
//           }
//         });

//         this.props.keywordChange(keyword);
//       }

//     render(){
//         const notes = this.state.notes.filter((note) =>{
//             return note.title.toLowerCase().includes(
//                 this.state.keyword.toLowerCase()
//             );
//         });

//         return(
//             <section>
//                 <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
//                 <h2>Daftar Note</h2>
//                 <NoteList notes={notes} onDelete = {this.onDeleteHandler} />
//             </section>
//         )
//     }
// }

// HomePage.propTypes = {
//     defaultKeyword : PropTypes.string,
//     keywordChange : PropTypes.func.isRequired,
// }

// export default HomePageWrapper;