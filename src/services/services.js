import * as utility from './../utility/utility';

export async function getResponse(sequenceURI, resolve) {
    const res = await fetch(sequenceURI);
    resolve(await res.json());
}

export async function getDNASequence(id) {
    return new Promise((resolve, reject) => {
        return getResponse(utility.getSequenceURI(id), resolve);
    });
}

export async function iterateAllTranscriptdata(transcripts, params) {
    const promises = [];

    for (let id of transcripts) {
        promises.push(await getDNASequence(id));
    }

    const filterData = promises.filter(res => {
        return utility.isValidSequence(res, params);
    });

    if (filterData && Array.isArray(filterData)) {
        return filterData.map(item => utility.transcriptLinkObject(item.id));
    }
}

export async function getTranscriptLinks(params) {
    const response = await fetch(utility.getGeneSymbolURI(params.geneSymbol));
    const data = await response.json();
    if (data && data.Transcript && Array.isArray(data.Transcript)) {
        const transcript = data.Transcript.map(item => item.id);
        return iterateAllTranscriptdata(transcript, params);
    }
}