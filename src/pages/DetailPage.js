import React from "react";
import {useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import NoteItem from "../components/NoteItem";
import {deleteNote, getNoteId} from "../utils/api";

function DetailPageWrapper() {
    const navigate = useNavigate();
    const { id } = useParams();
    

    function homeNavigate(){
        navigate('/')
    }
    return <DetailPage id={(id)} navigate = {homeNavigate}/>;
  }

class DetailPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            note : null,
            initializing : true,
        }
        this.onDeleteClickHandler = this.onDeleteClickHandler.bind(this);
    }

    async componentDidMount(){
        const{data} = await getNoteId(this.props.id);

        this.setState(() =>{
            return{
                note:data,
                initializing: false,
            }
        })
    }
    async onDeleteClickHandler(id){
        await deleteNote(id);
        const {navigate} = this.props;
        navigate();
    }


    render(){
        if(this.state.note === null){
            return <p>Catatan tidak tersedia</p>;
        }
        if(this.state.note){
          return(
            <section>
                <NoteItem {...this.state.note} onDelete={this.onDeleteClickHandler}/>
            </section>
        );   
        }
       
    }

   
}
DetailPage.propTypes ={
    id: PropTypes.string.isRequired,
    navigate: PropTypes.func.isRequired,
}

export default DetailPageWrapper;