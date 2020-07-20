import React from 'react';

import Header from "./../header/Header";
import Loading from "./../loading-view/Loading";
import useCustomFetch from './../../hooks/useCustomFetch';

function EnsemblLinkView(props) {
  const [list, loading, error] = useCustomFetch(props.queryParams);

  return (
    <div className="ensembl-link-view">
      <Header/>
      {loading && <Loading/>}
      {!loading && list && (
        <div>
            <ul className="list-view">
            {
              list.map((li, idx) => {
                return <li key={idx} className="list-item">
                    <a href={li.link} className="list-item-link">
                      {li.id}
                    </a>
                  </li>
              })
            }
            </ul>
        </div>
      )}
      {error && <div>Error: {error}</div>}
    </div>
  );
}
export default EnsemblLinkView;