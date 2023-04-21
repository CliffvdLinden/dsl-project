import React, { useState } from 'react';
import Submenu from './Submenu';
import { useGlobalFilterContext } from '../../filterContext';
import closeIcon from '../../assets/closeIcon.png';

const Searchbar = () => {
    const [isTyping, setIsTyping] = useState(false);
    const [showCloseButton, setShowCloseButton] = useState(false);
    const [showTypedResult, setShowTypedResult] = useState(false);
    const {
        isSubmenuOpen,
        toggleSubmenu,
        updateSort,
        sort,
        filters,
        // filters: { text },
        updateFilters,
        clearFilters,
        filteredPublications,
        closeSubmenu,
        resetCtr,
        ctr,
    } = useGlobalFilterContext();

    return (
        <section className='search-bar'>
            <form
                action='#'
                className='form'
                onSubmit={(e) => e.preventDefault()}
            >
                {/* filter dropdown */}
                <fieldset className='child1'>
                    <fieldset className='subchild1'>
                        <label htmlFor='filter' className='sr-only'>
                            filter
                        </label>
                        <input
                            // type='text'
                            name='filter'
                            id='filter'
                            className='regular-caps filterBx bx'
                            // placeholder='filter'
                            placeholder={`${
                                ctr > 0 ? `filter (${ctr})` : 'filter'
                            }`}
                            value=''
                            onClick={() => {
                                toggleSubmenu();
                                setIsTyping(false);
                                setShowTypedResult(false);
                            }}
                            onChange={updateFilters}
                        ></input>
                    </fieldset>

                    {/* sort-by dropdown */}
                    <fieldset className='subchild2'>
                        <label htmlFor='sort' className='sr-only'>
                            sort by
                        </label>

                        <select
                            name='sort'
                            id='sort'
                            className='regular-caps sortBx bx '
                            value={sort}
                            onChange={updateSort}
                        >
                            <option
                                value='placeholder'
                                // selected
                                id='sort'
                                className='placeholder regular-caps'
                            >
                                SORT BY
                            </option>
                            <option value='yearL' className='op regular-caps'>
                                Year Inc
                            </option>
                            <option value='yearH' className='op regular-caps'>
                                Year Dec
                            </option>
                        </select>
                    </fieldset>
                    <div className='subMenu'>
                        {isSubmenuOpen && <Submenu />}
                    </div>
                </fieldset>

                {/* search bar */}
                {/* child  */}
                {/* <fieldset className='child2'> */}
                <fieldset
                    className={`${
                        isTyping ? 'child2 expand-search' : 'child2'
                    }`}
                >
                    <label htmlFor='search' className='sr-only'>
                        search
                    </label>
                    <input
                        type='text'
                        name='text'
                        id='search'
                        // placeholder='search'
                        placeholder={`search`}
                        className='regular-caps searchBx bx'
                        value={filters.text}
                        onChange={updateFilters}
                        onClick={() => {
                            setIsTyping(true);
                            setShowCloseButton(false);
                            closeSubmenu();
                        }}
                    />
                    {/* SEARCH button */}
                    {isTyping && (
                        <button
                            className='commonCloseBtn search-button regular-caps'
                            type='submit'
                            name='text'
                            onClick={() => {
                                setIsTyping(false);
                                setShowCloseButton(true);
                                setShowTypedResult(true);
                            }}
                        >
                            search
                        </button>
                    )}
                    {/* CLOSE button */}
                    {showCloseButton && (
                        <button
                            className='commonCloseBtn close-search-btn'
                            name='text'
                            data-c='hello'
                            onClick={(e) => {
                                updateFilters(e);
                                setIsTyping(false);
                                setShowCloseButton(false);
                            }}
                        >
                            <img
                                className='close-img'
                                src={`${closeIcon}`}
                                alt='close search bar'
                                name='text'
                                onClick={(e) => {
                                    updateFilters(e);
                                    setIsTyping(false);
                                    setShowCloseButton(false);
                                    setShowTypedResult(false);
                                }}
                            />
                        </button>
                    )}
                </fieldset>
            </form>

            {/* filtered tags */}
            <div className='filtered-tags-container'>
                {/* publication type */}
                {filters.pubType && (
                    <button
                        className='filt-btn semi-14'
                        onClick={updateFilters}
                        name='pubType'
                    >
                        {filters.pubType}
                        <img
                            src={closeIcon}
                            alt='close icon'
                            name='pubType'
                            onClick={updateFilters}
                            className='close-img'
                        />
                    </button>
                )}

                {/* author */}
                {filters.authors && (
                    <button
                        className='filt-btn semi-14'
                        onClick={updateFilters}
                        name='authors'
                    >
                        {filters.authors}

                        <img
                            src={closeIcon}
                            alt='close icon'
                            name='authors'
                            onClick={updateFilters}
                            className='close-img'
                        />
                    </button>
                )}

                {/* year */}
                {filters.year && (
                    <button
                        className='filt-btn semi-14'
                        name='year'
                        onClick={updateFilters}
                    >
                        {filters.year}

                        <img
                            src={closeIcon}
                            alt='close icon'
                            name='year'
                            onClick={updateFilters}
                            className='close-img'
                        />
                    </button>
                )}
            </div>

            {/* result text and clear button*/}
            {filteredPublications !== undefined &&
                !isTyping &&
                !showTypedResult && (
                    <div className='result-found-container'>
                        <h3 className='result-found'>
                            {`${
                                filteredPublications.length > 1
                                    ? `${filteredPublications.length} results`
                                    : `${filteredPublications.length} result`
                            }`}
                        </h3>
                        <button
                            className='clear-filters-btn regular-caps'
                            // onClick={handleOnClick}
                            onClick={() => {
                                clearFilters();
                                closeSubmenu();
                                resetCtr();
                                setIsTyping(false);
                            }}
                        >
                            clear filters
                        </button>
                    </div>
                )}

            {/* show typed result */}
            {showTypedResult && (
                <div className='result-found-container'>
                    <h3 className='result-found'>
                        {`${
                            filteredPublications.length > 1
                                ? `${filteredPublications.length} results for "${filters.text}"`
                                : `${filteredPublications.length} result for "${filters.text}"`
                        }`}
                    </h3>
                </div>
            )}
        </section>
    );
};

export default Searchbar;
