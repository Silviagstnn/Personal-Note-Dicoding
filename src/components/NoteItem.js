import React from "react";
import PropType from 'prop-types';
import NoteItemDetail from "./NoteItemDetail";
import NoteItemBody from "./NoteItemBody";
import DeleteButton from "./DeleteButton";

function NoteItem ({title,createdAt, body, id, onDelete }){
    return(
    <div className="note-item">
     <NoteItemDetail id={id} title={title}/>
     <NoteItemBody createdAt={createdAt} body={body} />
     <DeleteButton id={id} onDelete={onDelete} />
   </div>
    );

}

NoteItem.propTypes = {
    title : PropType.string.isRequired,
    createdAt : PropType.string.isRequired,
    body : PropType.string.isRequired,
    onDelete : PropType.func.isRequired,
    id : PropType.string.isRequired,
}

export default NoteItem;