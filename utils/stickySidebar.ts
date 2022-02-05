const updateMoveWidth = (moveElem: string, containerElem: string) => {
  const width =
    Number($(window).width()) > 1199 ? $(containerElem).width() || 0 : ''

  $(moveElem).width(width)
}

const updatePosition = (moveElem: string, containerElem: string) => {
  const containerOffsetTop = $(containerElem).offset()?.top || 0
  const containerHeight = $(containerElem).height() || 0
  const moveHeight = $(moveElem).height() || 0
  const scrollTop = $(window).scrollTop() || 0

  if (
    containerOffsetTop - 20 >= scrollTop ||
    scrollTop === 0 ||
    moveHeight >= containerHeight ||
    Number($(window).width()) < 1199
  ) {
    $(moveElem).removeClass('header_fixed header_bottom')

    return
  }

  if (scrollTop + 20 + moveHeight > containerOffsetTop + containerHeight) {
    $(moveElem).removeClass('header_fixed')
    $(moveElem).addClass('header_bottom')

    return
  }

  $(moveElem).removeClass('header_bottom')
  $(moveElem).addClass('header_fixed')
}

const refreshInit = (moveElem: string, containerElem: string) => {
  updateMoveWidth(moveElem, containerElem)
  updatePosition(moveElem, containerElem)
}

export const init = (moveElem: string, containerElem: string) => {
  $(window).on('scroll', () => {
    setTimeout(() => {
      updatePosition(moveElem, containerElem)
    })
  })

  $(window).on('resize', () => {
    setTimeout(() => {
      refreshInit(moveElem, containerElem)
    })
  })

  setTimeout(() => {
    refreshInit(moveElem, containerElem)
  }, 200)
}
