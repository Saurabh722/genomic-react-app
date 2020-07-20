export function getGeneSymbolURI(geneSymbol) {
    return `http://rest.ensembl.org/lookup/symbol/homo_sapiens/${geneSymbol}.json?;expand=1`;
}

export function getSequenceURI(id) {
    return `http://rest.ensembl.org/sequence/id/${id}.json`;
}

export function transcriptLinks (id) {
    return `http://www.ensembl.org/id/${id}`;
}

export function transcriptLinkObject (id) {
    return {
        id,
        link: transcriptLinks(id)
    }
}

export function isValidSequence(res, params) {
    const sequence = res.seq ? res.seq.toString() : false;

    if (sequence && sequence.length >= params.proteinSequence) {
        return sequence.charAt(params.proteinSequence - 1) === params.aminoAcidLetter.toUpperCase();
    }

    return false;
}