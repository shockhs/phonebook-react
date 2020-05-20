import React, { FunctionComponent } from 'react';

interface SearchContact {
    handleChangeSearch: (name: string) => void
    searchName: string
}

const SearchContact: FunctionComponent<SearchContact> = ({ handleChangeSearch, searchName }) => {

    return (
        <div className="searchForm">
            <div className="inputForm__field">
                <input
                    required
                    type="text"
                    value={searchName}
                    onChange={(e) => handleChangeSearch(e.currentTarget.value)}
                />
                <label>Search:</label>
                <span></span>
            </div>
        </div>
    );
}

export default SearchContact;