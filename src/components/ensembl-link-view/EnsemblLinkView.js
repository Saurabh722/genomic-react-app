import React from 'react';

import ErrorBoundary from "./../error-boundary/ErrorBoundary";
import Header from "./../header/Header";
import Loading from "./../loading-view/Loading";
import useCustomFetch from './../../hooks/useCustomFetch';
import ListItem from "./ListItem";

function EnsemblLinkView(props) {
  const [list, loading, error] = useCustomFetch(props.queryParams);

  return (
    <div className="ensembl-link-view">
      <Header/>
      {loading && <Loading/>}
      {!loading && error && list && (
        <h3 className="center-align">{error}.</h3>
      )}
      {!loading && !error && list && (
        <div>
            <ul className="list-view">
            {
              list.map((li, idx) => {
                return <ErrorBoundary key={"error-boundary" + idx}>
                    <ListItem key={idx} link={li.link} id={li.id}/>
                  </ErrorBoundary>
              })
            }
            </ul>
        </div>
      )}
      {error && !list && <div>
        <h3 className="center-align">Looks like some thing went wrong :(</h3>
      </div>}
    </div>
  );
}
export default EnsemblLinkView;