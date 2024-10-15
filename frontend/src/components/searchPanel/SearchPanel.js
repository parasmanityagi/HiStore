import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SearchPanel = ({ setSearch }) => {
    const searchRef = useRef();
    const [showResult, setShowResult] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchRes, setSearchRes] = useState([]);

    const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setShowResult(false);
            setSearchText('');
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const products = useSelector((state) => state.product.products);

    const submitHandler = () => {
        if (searchText) {
            const res = products.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));
            setShowResult(true);
            setSearchRes(res);
        } else {
            setSearchRes([]);
            setShowResult(false);
        }
    };

    useEffect(() => {
        submitHandler();
    }, [searchText]);

    const handleResultClick = () => {
        setShowResult(false);
        setSearchText('');
    };

    return (
        <div ref={searchRef}>
            <div className='flex'>
                <input
                    name='search'
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    type="text"
                    placeholder='Search Here'
                    className='rounded-full py-2 pl-4 pr-4 w-full text-[14px] outline-none border-[1px]'
                />
                <i
                    onClick={() => setSearch(false)}
                    className='bi bi-x-lg ml-2 sm:hidden cursor-pointer border-2 px-1.5 rounded-full my-1 pt-0.5'
                />
            </div>

            {showResult && (
                <ul className='absolute w-full h-30 overflow-y-auto bg-white z-50 py-1 rounded-b-lg'>
                    {searchRes.length > 0 ? (
                        searchRes.map((res) => (
                            <Link
                                key={res._id}
                                to={`api/product/${res._id}`}
                                onClick={handleResultClick}
                            >
                                <li className='px-2 my-2 capitalize truncate hover:text-sky-400 cursor-pointer'>
                                    {res.name}
                                </li>
                            </Link>
                        ))
                    ) : (
                        <li className='px-2 my-2 capitalize truncate select-none'>
                            Not Found!
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default SearchPanel;
