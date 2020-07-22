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

export async function getTranscriptLinks(params) {
    const response = await fetch(utility.getGeneSymbolURI(params.geneSymbol));
    const data = await response.json();
    if (data && data.Transcript && Array.isArray(data.Transcript)) {
        const transcript = data.Transcript.map(item => item.id);
        return iterateAllTranscriptdata(transcript, params);
    }
}