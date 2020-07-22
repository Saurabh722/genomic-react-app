export function getGeneSymbolURI(geneSymbol) {
    return `http://rest.ensembl.org/lookup/symbol/homo_sapiens/${geneSymbol}.json?;expand=1`;
}

export function getSequenceURI(id) {
    return `http://rest.ensembl.org/sequence/id/${id}.json`;
}

export function transcriptLinks (id) {
    return `http://www.ensembl.org/id/${id}`;
}

/**
 * @param {String} id - transcript Id.
 * @returns {Object} contain transcript Id and transcriptLink.
 */
export function transcriptLinkObject (id) {
    return {
        id,
        link: transcriptLinks(id)
    }
}

/**
 * Validate matching Amino Acid Letter with DNA sequence string.
 * @param {Object} res - contain DNA sequence string and other details.
 * @param {Object} params - contain proteinSequence(Number) and aminoAcidLetter(Char).
 * @returns {Boolean} If matches return true.
 */
export function isValidSequence(res, params) {
    const sequence = res.seq ? res.seq.toString() : false;

    if (sequence && sequence.length >= params.proteinSequence) {
        return sequence.charAt(params.proteinSequence - 1) === params.aminoAcidLetter.toUpperCase();
    }

    return false;
}