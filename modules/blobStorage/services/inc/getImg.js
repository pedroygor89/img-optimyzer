let list = []

const listImg = (jsonList) => {
    if(jsonList.children) {
        for (let lista of jsonList.children) {
          listImg(lista)
        }
    } else {
			list.push(jsonList)
		}

		return list
}

module.exports = { listImg }