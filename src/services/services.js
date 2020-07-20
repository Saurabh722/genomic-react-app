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
        const sequence = res.seq ? res.seq.toString() : false;

        if (sequence && sequence.length >= params.proteinSequence) {
            return sequence.charAt(params.proteinSequence - 1) === params.aminoAcidLetter;
        }

        return false;
    });

    const data = filterData.map(item => utility.transcriptLinkObject(item.id));
    return data;
}

export async function getTranscriptLinks(params) {
    const response = await fetch(utility.getGeneSymbolURI(params.geneSymbol));
    const data = await response.json();
    const transcript = data.Transcript.map(item => item.id);
    return iterateAllTranscriptdata(transcript, params);
}