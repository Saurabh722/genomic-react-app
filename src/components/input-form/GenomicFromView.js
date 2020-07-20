import React, { useState } from "react";

import msg from "./../../utility/messages";
import Header from "./../header/Header";

const initState = {
    geneSymbol: "BRAF",
    proteinSequence: 200,
    aminoAcidLetter: "T",
};

function GenomicFromView (props) {
    const [genomicData, setGenomicData] = useState(initState);

    function isValidForm() {
        return genomicData.geneSymbol && genomicData.proteinSequence && genomicData.aminoAcidLetter
    }

    function onChangeHandle(event) {
        genomicData[event.target.id] = event.target.value;
        setGenomicData({
            ...genomicData
        });
    }

    function onClickHandle(event) {
        if (isValidForm()) {
            props.onSumitForm(genomicData);
        }
    }

    return (
        <div className="genomic-form-view">
            <Header/>
            <div className="genomic-form">
                <div className="form-field">
                    { !genomicData.geneSymbol && <span className="validation-error" id="geneSymbol">{msg.validation.geneSymbol}</span> }
                    <input
                        id="geneSymbol"
                        type="text"
                        placeholder={"Gene Symbol e.g. BRAF"}
                        defaultValue={genomicData.geneSymbol}
                        onChange={onChangeHandle}
                    />
                </div>
                <div className="form-field">
                    { !genomicData.proteinSequence && <span className="validation-error">{msg.validation.proteinSequence}</span> }
                    <input
                        id="proteinSequence"
                        type="number"
                        placeholder={"Protein Sequence e.g. 200"}
                        defaultValue={genomicData.proteinSequence}
                        onChange={onChangeHandle}
                    />
                </div>
                <div className="form-field">
                    { !genomicData.aminoAcidLetter && <span className="validation-error">{msg.validation.aminoAcid}</span> }
                    <input
                        id="aminoAcidLetter"
                        type="text"
                        maxLength="1"
                        placeholder={"Amino Acid Letter e.g. T"}
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