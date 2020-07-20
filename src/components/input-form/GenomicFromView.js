import React, { useState } from "react";

import Header from "./../header/Header";

const initGenomicData = {
    geneSymbol: "BRAF",
    proteinSequence: 200,
    aminoAcidLetter: "T",
};

function GenomicFromView (props) {
    const [genomicData, setGenomicData] = useState(initGenomicData);

    function onChangeHandle(event) {
        genomicData[event.target.id] = event.target.value;
        setGenomicData(genomicData);
    }

    function onClickHandle(event) {
        props.onSumitForm(genomicData);
    }

    return (
        <div className="genomic-form-view">
            <Header/>
            <div className="genomic-form">
                <div className="form-field">
                <input
                    id="geneSymbol"
                    type="text"
                    placeholder="Gene symbol"
                    defaultValue={genomicData.geneSymbol}
                    onChange={onChangeHandle}
                />
                </div>
                <div className="form-field">
                <input
                    id="proteinSequence"
                    type="number"
                    placeholder="Protein Sequence"
                    defaultValue={genomicData.proteinSequence}
                    onChange={onChangeHandle}
                />
                </div>
                <div className="form-field">
                    <input
                        id="aminoAcidLetter"
                        type="text"
                        maxLength="1"
                        placeholder="Amino Acid Letter"
                        defaultValue={genomicData.aminoAcidLetter}
                        onChange={onChangeHandle}
                    />
                </div>
                <button
                    id="submitButton"
                    onClick={onClickHandle}
                >
                Submit
                </button>
            </div>
        </div>
    );
}

export default GenomicFromView;