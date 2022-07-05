const path = require('path')

module.exports = async () => {
    const jsonImages = require('./../../../_commons/actions/convertCsvJson')
    const listImages = await jsonImages(path.join(global.contentRoot,  'relatorio', 'report.csv'), true);
    const UmMega = 1000000

    const objectReturn = {
        totalImages: 0,
        totalMegaBytesAntesCompressao: 0,
        totalMegaBytesDepoisCompressao: 0,
        temas: []
    }

		// agrupa por urlTema
    let group = listImages.reduce((r, a) => {
        r[a.urlTema] = [...r[a.urlTema] || [], a];
    return r;
    }, {});

    Object.keys(group).forEach(function(urlTema) {
        let url = urlTema
        let totalImagesTema = 0
        let totalMegaBytesAntesCompressaoTema = 0
        let totalMegaBytesDepoisCompressaoTema = 0

        listImages.filter(tema => tema.urlTema.toString() === urlTema.toString())
        .reduce((acc, index, key, tema) => {
            objectReturn.totalImages = ++objectReturn.totalImages
            objectReturn.totalMegaBytesAntesCompressao = objectReturn.totalMegaBytesAntesCompressao + parseFloat(tema[key].imageAntes)
            objectReturn.totalMegaBytesDepoisCompressao = objectReturn.totalMegaBytesDepoisCompressao + parseFloat(tema[key].imageDepois)

            totalImagesTema = ++totalImagesTema
            totalMegaBytesAntesCompressaoTema = parseFloat(totalMegaBytesAntesCompressaoTema + (parseFloat((tema[key].imageAntes)/UmMega))),
            totalMegaBytesDepoisCompressaoTema= parseFloat(totalMegaBytesDepoisCompressaoTema + (parseFloat(tema[key].imageDepois)/UmMega))

        }, 0)

        objectReturn.temas.push({
            totalImagesTema,
            url,
            totalMegaBytesAntesCompressaoTema: parseFloat(totalMegaBytesAntesCompressaoTema.toFixed(2)),
            totalMegaBytesDepoisCompressaoTema: parseFloat(totalMegaBytesDepoisCompressaoTema.toFixed(2))
        })
    })

    objectReturn.totalMegaBytesAntesCompressao = parseFloat((objectReturn.totalMegaBytesAntesCompressao / UmMega).toFixed(2))
    objectReturn.totalMegaBytesDepoisCompressao = parseFloat((objectReturn.totalMegaBytesDepoisCompressao / UmMega).toFixed(2))

    return objectReturn
}