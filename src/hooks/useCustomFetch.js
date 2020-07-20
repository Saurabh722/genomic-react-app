import { useState, useEffect } from "react";

import * as services from './../services/services';

function useCustomFetch(params) {
  const [list, setList] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  async function customeFetch(params) {
    try {
      const transcriptLinks = await services.getTranscriptLinks(params);
      setList(transcriptLinks);
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    if (params) {
      customeFetch(params);
    };
  }, [params]);

  return [list, loading, error];
}

export default useCustomFetch;
