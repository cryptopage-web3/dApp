const updateMoveWidth = (moveElem: string, containerElem: string) => {
  $(moveElem).width($(containerElem).width() || 0)
}

const updatePosition = (moveElem: string, containerElem: string) => {
  const containerOffsetTop = $(containerElem).offset()?.top || 0
  const containerHeight = $(containerElem).height() || 0
  const moveHeight = $(moveElem).height() || 0
  const scrollTop = $(window).scrollTop() || 0

  if (containerOffsetTop - 20 > scrollTop || containerHeight === moveHeight) {
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

export const init = (moveElem: string, containerElem: string) => {
  $(window).on('scroll', () => {
    updatePosition(moveElem, containerElem)
  })

  setTimeout(() => {
    updateMoveWidth(moveElem, containerElem)
    updatePosition(moveElem, containerElem)
  }, 200)
}
