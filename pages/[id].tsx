import React from 'react'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

function ShowSlip() {

    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const docDefinition = {
    content: [
      { text: 'สวัสดีประเทศไทย reat pdf demo ', fontSize: 15 },
    ],
    };
    pdfMake.createPdf(docDefinition).open()
}

export default ShowSlip;
