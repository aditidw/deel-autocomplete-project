import React, { useState } from "react";

const AutocompleteUsingDummyData = (props) => {
  const [active, setActive] = useState(0);
  const [filtered, setFiltered] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [input, setInput] = useState("");
  
  const onChange = e => {
    const { states } = props;
    const input = e.currentTarget.value;
    const newFilteredStates = states.filter(
      state =>
        state.toLowerCase().indexOf(input.toLowerCase()) > -1
    );
    setActive(0);
    setFiltered(newFilteredStates);
    setIsShow(true);
    setInput(e.currentTarget.value)
  };

  const onClick = e => {
    setActive(0);
    setFiltered([]);
    setIsShow(false);
    setInput(e.currentTarget.innerText)
  };

  const onKeyDown = e => {
    if (e.keyCode === 13) { 
      setActive(0);
      setIsShow(false);
      setInput(filtered[active])
    }
    else if (e.keyCode === 38) { 
      return (active === 0) ? null : setActive(active - 1);
    }
    else if (e.keyCode === 40) { 
      return (active - 1 === filtered.length) ? null : setActive(active + 1);
    }
  };

  const renderAutocomplete = () => {
    if (isShow && input) {
      if (filtered.length) {
        return (
          <ul className="autocomplete">
            {filtered.map((state, index) => {
              let className;
              if (index === active) {
                className = "active";
              }
              return (
                <li className={className} key={state} onClick={onClick}>
                  {state}
                </li>
              );
            })}
          </ul>
        );
      } else {
        return (
          <div className="no-autocomplete">
            <em>The State you're trying to find is not available.</em>
          </div>
        );
      }
    }
    return <></>;
  }  

  return (
    <div className="inputContainerDummyData">
      <h1>Auto Search using Dummy Data</h1>
      <input
        type="text"
        placeholder="Search US states here ..."
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      {renderAutocomplete()}
    </div>
  );
}

export default AutocompleteUsingDummyData;