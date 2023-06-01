import React, { useEffect, useState, useRef } from "react";

const AutocompleteUsingAPI = () => {
  const wrapperRef = useRef(null);
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const promises = new Array(1)
        .fill()
        .map((v, term) =>
          fetch(`https://jsonplaceholder.typicode.com/users?q=${term}`)
            .then(response => response.json())
            .then(data => {
              if (Array.isArray(data) && data.length > 0 && data[term].hasOwnProperty("name")) {
                return data.map(({ name }) => ({ name }));
              } else {
                return [];
              }
            })
        );
      const peopleArr = await Promise.all(promises);
      const people = peopleArr.flat(); // Flatten the array of arrays
      setOptions(people);
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const { current: wrap } = wrapperRef;
      if (wrap && !wrap.contains(event.target)) {
        setDisplay(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const updatePeople = ppl => {
    setDisplay(false);
    setSearch(ppl);
  };

  return (
    <div ref={wrapperRef} className="inputContainer">
      <h1>Auto Search using API</h1>
      <input
        id="auto"
        onClick={() => setDisplay(!display)}
        placeholder="Search people here ..."
        value={search}
        onChange={event => setSearch(event.target.value)}
      />
      {display && (
        <div className="autoContainer">
          {options
            .filter(({ name }) => name && name.toLowerCase().indexOf(search.toLowerCase()) > -1)
            .map((value, i) => {
              return (
                <div
                  onClick={() => updatePeople(value.name)}
                  className="option"
                  key={i}
                  tabIndex="0"
                >
                  <span>{value.name}</span>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default AutocompleteUsingAPI;