export const validateForm = ({ title, text, attributes }) => {
  // validate title

  if (!title) {
    return {
      status: false,
      error: 'Empty title'
    }
  }

  // validate text

  if (!text) {
    return {
      status: false,
      error: 'Empty text'
    }
  }

  // validate properties

  if (attributes.properties?.length) {
    const hasEmptyField = attributes.properties.some(
      ({ type, value }) => !type || !value
    )

    if (hasEmptyField) {
      return {
        status: false,
        error: 'Empty field in properties'
      }
    }
  }

  // validate levels

  if (attributes.levels?.length) {
    let levelError = ''

    attributes.levels.forEach(({ type, value, maxValue }) => {
      if (levelError) {
        return
      }

      if (!type || !value || !maxValue) {
        levelError = 'Empty field in levels'
        return
      }

      if (!isFinite(value) || !isFinite(maxValue)) {
        levelError = 'Value is not a number in levels'
        return
      }

      if (+maxValue < +value) {
        levelError = 'Value is greater than maximum in levels'
      }
    })

    if (levelError) {
      return {
        status: false,
        error: levelError
      }
    }
  }

  // validate stats

  if (attributes.stats?.length) {
    let statsError = ''

    attributes.stats.forEach(({ type, value, maxValue }) => {
      if (statsError) {
        return
      }

      if (!type || !value || !maxValue) {
        statsError = 'Empty field in stats'
        return
      }

      if (!isFinite(value) || !isFinite(maxValue)) {
        statsError = 'Value is not a number in stats'
        return
      }

      if (+maxValue < +value) {
        statsError = 'Value is greater than maximum in stats'
      }
    })

    if (statsError) {
      return {
        status: false,
        error: statsError
      }
    }
  }

  return {
    status: true
  }
}

export const getAdaptedAttributes = (attributes) => {
  // adapt properties

  const properties = (attributes.properties || []).map((property) => ({
    trait_type: property.type,
    value: property.value
  }))

  // adapt levels

  const levels = (attributes.levels || []).map((level) => ({
    trait_type: level.type,
    value: +level.value,
    max_value: +level.maxValue
  }))

  // adapt levels

  const stats = (attributes.stats || []).map((stat) => ({
    display_type: 'number',
    trait_type: stat.type,
    value: +stat.value,
    max_value: +stat.maxValue
  }))

  return [...properties, ...levels, ...stats]
}
