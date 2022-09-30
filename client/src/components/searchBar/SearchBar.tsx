import React, { SyntheticEvent, useState } from 'react'
import { BiSearch, MdClear } from 'react-icons/all'

import './searchBar.scss'

const SearchBar = () => {
    const [state, setState] = useState({
        open: false,
    })

    function handleClickOnSearch(e) {
        setState({
            ...state,
            open: true,
        })
    }

    function handleCloseSearchMenu(e: SyntheticEvent) {
        e.stopPropagation()
        setState({
            ...state,
            open: false,
        })
    }

    return (
        <>
            {state.open && <div className="search-backdrop" onClick={handleCloseSearchMenu}></div>}
            <div className={`search-menu ${state.open ? 'search-menu--expand' : ''}`}>
                <div className="">
                    <div className="search-input" onClick={handleClickOnSearch}>
                        <div className="placeholder-space">
                            <div className="search-input-demo">
                                <BiSearch className="search-icon" />
                                <span className="search-label">Search music</span>
                            </div>
                            <div className={`search-input-control ${state.open ? 'search-input-control--open' : ''}`}>
                                <span className="search-reset">Clear</span>
                                <MdClear onClick={handleCloseSearchMenu} className="search-clear" />
                            </div>
                        </div>

                        <div className={`search-content ${state.open ? 'search-content-open' : ''}`}>
                            <h4 className="">TRENDING</h4>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aut, blanditiis dolor
                                dolores ea eum eveniet exercitationem fuga, id ipsam iusto libero molestias mollitia,
                                nulla praesentium quaerat qui sed sunt tempora ut? Alias, autem, commodi cupiditate
                                dicta dolore doloribus eaque, enim fugiat provident sapiente suscipit totam velit.
                                Adipisci aliquam amet eveniet explicabo laboriosam non placeat vel. Adipisci
                                consequuntur cupiditate delectus dignissimos expedita fugiat fugit illum incidunt
                                maxime, optio recusandae repellendus sint voluptas? A commodi dicta doloremque,
                                doloribus et eveniet fugit ipsum laborum, minima neque nulla perferendis porro quaerat
                                quis quisquam quos repudiandae similique suscipit totam ullam vel veritatis vitae
                                voluptate.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchBar
