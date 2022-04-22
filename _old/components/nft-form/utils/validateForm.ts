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
      error: 'Title: empty field'
    }
  }

  // validate text

  if (!text) {
    return {
      status: false,
      error: 'Text: empty field'
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
        error: 'Properties: has empty fields'
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
        levelError = 'Levels: has empty fields'
        return
      }

      if (!isFinite(+value) || !isFinite(+maxValue)) {
        levelError = 'Levels: value is not a number'
        return
      }

      if (+maxValue < +value) {
        levelError = 'Levels: value is greater than maximum'
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
        statsError = 'Stats: has empty fields'
        return
      }

      if (!isFinite(+value) || !isFinite(+maxValue)) {
        statsError = 'Stats: value is not a number'
        return
      }

      if (+maxValue < +value) {
        statsError = 'Stats: value is greater than maximum'
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
        datesError = 'Dates: has empty fields'
        return
      }

      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        datesError = 'Dates: wrong date format'
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
        boostsError = 'Boosts: has empty fields'
        return
      }

      if (!isFinite(+value)) {
        boostsError = 'Boosts: value is not a number'
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
