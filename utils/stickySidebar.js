const updateMoveWidth = (moveElem, containerElem) => {
  $(moveElem).width($(containerElem).width())
}

const updatePosition = (moveElem, containerElem) => {
  const containerOffsetTop = $(containerElem).offset().top
  const containerHeight = $(containerElem).height()
  const moveHeight = $(moveElem).height()
  const scrollTop = $(window).scrollTop()

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

export const init = (moveElem, containerElem) => {
  $(window).on('scroll', () => {
    updatePosition(moveElem, containerElem)
  })

  setTimeout(() => {
    updateMoveWidth(moveElem, containerElem)
    updatePosition(moveElem, containerElem)
  }, 200)
}
