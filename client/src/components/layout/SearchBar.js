import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchLogs, clearSearch } from "../../actions/logActions";

const SearchBar = ({ log: { searched }, searchLogs, clearSearch }) => {
  const text = useRef("");

  useEffect(() => {
    if (searched === null) {
      text.current.value = "";
    }
  });

  const onChange = e => {
    if (text.current.value !== "") {
      searchLogs(e.target.value);
    } else {
      clearSearch();
    }
  };

  return (
    <div>
      <nav style={{ marginBottom: "30px" }} className="blue">
        <div className="nav-wrapper">
          <form>
            <div className="input-field">
              <input
                id="search"
                type="search"
                placeholder="Search Logs..."
                ref={text}
                onChange={onChange}
              />
              <label className="label-icon" htmlFor="search">
                <i className="material-icons">search</i>
              </label>
              <i className="material-icons">close</i>
            </div>
          </form>
        </div>
      </nav>
    </div>
  );
};

SearchBar.propTypes = {
  log: PropTypes.object.isRequired,
  searchLogs: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  log: state.log
});

export default connect(
  mapStateToProps,
  { searchLogs, clearSearch }
)(SearchBar);
