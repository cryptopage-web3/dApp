import { IValidateFormParams, IValidateFormResult } from '../types'

export const validateForm = ({
  title,
  text,
  attributes
}: IValidateFormParams): IValidateFormResult => {
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

      if (!isFinite(+value) || !isFinite(+maxValue)) {
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

      if (!isFinite(+value) || !isFinite(+maxValue)) {
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

  // validate dates

  if (attributes.dates?.length) {
    let datesError = ''

    attributes.dates.forEach(({ type, value }) => {
      if (datesError) {
        return
      }

      if (!type || !value) {
        datesError = 'Empty field in dates'
        return
      }

      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        datesError = 'Wrong date format'
      }
    })

    if (datesError) {
      return {
        status: false,
        error: datesError
      }
    }
  }

  // validate boosts

  if (attributes.boosts?.length) {
    let boostsError = ''

    attributes.boosts.forEach(({ type, value, displayType }) => {
      if (boostsError) {
        return
      }

      if (!type || !value || !displayType) {
        boostsError = 'Empty field in boosts'
        return
      }

      if (!isFinite(+value)) {
        boostsError = 'Value is not a number in boosts'
      }
    })

    if (boostsError) {
      return {
        status: false,
        error: boostsError
      }
    }
  }

  return {
    status: true
  }
}
