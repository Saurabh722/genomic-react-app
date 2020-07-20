import { useState, useEffect } from "react";

import msg from './../utility/messages';
import * as services from './../services/services';

function useCustomFetch(params) {
  const [list, setList] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  async function customeFetch(params) {
    try {
      const transcriptLinks = await services.getTranscriptLinks(params);
      if (transcriptLinks) {
        setList(transcriptLinks);

        if (transcriptLinks.length === 0) {
          setError(msg.noMatchFound);
        }
      } else {
        setError(msg.somethingWentWrong);
      }
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
