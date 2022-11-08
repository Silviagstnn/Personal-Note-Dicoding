import React from "react";
import PropType from 'prop-types';


function NoteItemBody({body, createdAt}){
    return(
    <div className="note-item">
        <h4 className="note-item_waktu">{createdAt}</h4>
        <p className="note-item_isi">{body}</p>
   </div>
    );
}

NoteItemBody.propTypes ={
    createdAt : PropType.string.isRequired,
    body : PropType.string.isRequired,
}

export default NoteItemBody;