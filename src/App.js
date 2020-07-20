import React, { useState } from "react";

import GenomicFromView from "./components/input-form/GenomicFromView";
import EnsemblLinkView from "./components/ensembl-link-view/EnsemblLinkView";

const initState = {
  showEnsemblLinkView:false,
};

function App() {
  const [state, setState] = useState(initState);

  function setRequiredParams (queryParams) {
    setState({
      ...state,
      showEnsemblLinkView: true,
      queryParams
    });
  }

  return (
    <div className="genomic">
      {!state.showEnsemblLinkView && <GenomicFromView onSumitForm={setRequiredParams}/>}
      {state.showEnsemblLinkView && <EnsemblLinkView queryParams={state.queryParams}/>}
    </div>
  );
}

export default App;
