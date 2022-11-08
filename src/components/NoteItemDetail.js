import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function NoteItemDetail ({ id, title}) {
    return (
        <div className="notes-item-detail">
            <Link to={`/notes/${id}`}>{title}</Link>
        </div>
    );
}

NoteItemDetail.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
}

export default NoteItemDetail;