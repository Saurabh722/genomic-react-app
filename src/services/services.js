import * as utility from './../utility/utility';

/**
 * fetch data from given api link.
 * @param {String} sequenceURI - sequence URL.
 * @param {Function} resolve - Callback function.
 */
export async function getResponse(sequenceURI, resolve) {
    const res = await fetch(sequenceURI);
    resolve(await res.json());
}

/**
 * Generate Promise to retrieve DNA sequence of a gene by id.
 * @param {String} id - Transcript ids.
 * @returns {Promise} return Promise to retrieve DNA sequence of a gene by id.
 */
export async function getDNASequence(id) {
    return new Promise((resolve, reject) => {
        return getResponse(utility.getSequenceURI(id), resolve);
    });
}

/**
 * With given array of transcript ids, retrieve DNA sequences of a gene by ids.
 * @param {Array} transcripts - array of transcript ids.
 * @param {Object} params - contain geneSymbol(String), proteinSequence(Number) and aminoAcidLetter(Char).
 * @returns {Array} return array of Transcriptlink Object which matches aminoAcidLetter.
 */
export async function iterateAllTranscriptdata(transcripts, params) {
    const promises = [];
    let transcriptData = [];

    for (let id of transcripts) {
        promises.push(getDNASequence(id));
    }

    await Promise.all(promises).then(function(dataArr) {
        if (dataArr && Array.isArray(dataArr)) {
            transcriptData = dataArr.filter(res => {
                return utility.isValidSequence(res, params);
            });

            transcriptData = transcriptData.map(item => utility.transcriptLinkObject(item.id));
        }
    });

    return transcriptData
}

/**
 * With given array of transcript ids, retrieve DNA sequences of a gene by ids.
 * @param {Object} params - contain geneSymbol(String), proteinSequence(Number) and aminoAcidLetter(Char).
 * @returns {Array} return array of Transcriptlink Object which matches aminoAcidLetter.
 */
export async function getTranscriptLinks(params) {
    const response = await fetch(utility.getGeneSymbolURI(params.geneSymbol));
    const data = await response.json();
    if (data && data.Transcript && Array.isArray(data.Transcript)) {
        const transcript = data.Transcript.map(item => item.id);
        return iterateAllTranscriptdata(transcript, params);
    }
}