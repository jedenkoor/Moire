export default function getPagesInPagination(pagesAll, page) {
  const allPages = Array.from({ length: pagesAll }, (v, k) => k + 1)
  const numItemsInPagination = 7 // Количество элементов в пагинации, учитывая элементы с точками
  const numItemsRightOfCurrent = page < allPages[4] ? 3 : 1 // Условие, чтобы в начале количество элементов в пагинации не изменялось

  const pagesArr = []

  let currentPageIndex = allPages.indexOf(page)
  let j = allPages.length === numItemsInPagination ? 2 : 1 // Фикс, чтобы при совпадении элементов пагинации и кол-ва страниц не появлялись точки

  for (let i = numItemsRightOfCurrent; i > 0; i--) {
    if (!allPages[currentPageIndex - i]) {
      j++
    } else {
      pagesArr.push(allPages[currentPageIndex - i])
    }
  }

  pagesArr.push(page)

  for (let i = 1; i <= j; i++) {
    if (allPages[currentPageIndex + i]) {
      pagesArr.push(allPages[currentPageIndex + i])
      if (
        page === allPages[allPages.length - 4] &&
        allPages.length > numItemsInPagination
      ) {
        pagesArr.push(allPages[currentPageIndex + i + 1])
      }
    }
  }

  addPoints(
    pagesArr,
    allPages[allPages.length - 1],
    allPages[allPages.length - 2]
  )

  currentPageIndex = allPages.indexOf(pagesArr[0])
  const endLenght = pagesArr.length
  let numElInEnd

  if (allPages.length === numItemsInPagination) {
    // Условие, чтобы в конце количество элементов в пагинации не изменялось
    numElInEnd = numItemsInPagination - endLenght
  } else {
    numElInEnd = numItemsInPagination - 1 - endLenght
  }

  for (let i = 1; i < numElInEnd; i++) {
    if (allPages[currentPageIndex - i]) {
      pagesArr.unshift(allPages[currentPageIndex - i])
    }
  }

  addPoints(pagesArr, allPages[0], allPages[1], 'unshift')

  return pagesArr
}

function addPoints(pagesArr, first, two, method = 'push') {
  if (pagesArr.indexOf(first) === -1) {
    if (pagesArr.indexOf(two) === -1) {
      pagesArr[method]('...')
    }
    pagesArr[method](first)
  }
}
