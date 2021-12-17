import React from 'react'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

function ShowSlip() {

    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const reportTitle = [
      {
        text: 'บริษัท วันม๊อบบี้ จำกัด',
        fontSize: 15,
        bold: true,
        margin: [15, 20, 0, 45]
      }
    ]

    const docDefinition:any = {
      pageSize: 'A4',
      pageMargins: [15, 50, 15, 40],

      header: [reportTitle]
    };
    pdfMake.createPdf(docDefinition).open()
}

export default ShowSlip;
