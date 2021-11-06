/**
 * This is a definition of domain model for `comments` context.
 *
 * Here we only write classes and types that are shared with the server.
 * In case you need a type that only work on the client,
 * then use a regular typescript type and place it in `/types.ts` file.
 */

import * as ts from 'io-ts'

/**
 * Runtime type, that can be used for schema validation.
 *
 * We call them "models", because they are exchanged between client and server.
 *
 * @see https://github.com/gcanti/io-ts
 * @see https://github.com/aeirola/io-ts-promise
 */

export const Attribute = ts.partial({
  display_type: ts.union([
    ts.literal('boost_number'),
    ts.literal('boost_percentage'),
    ts.literal('number'),
    ts.literal('date'),
    ts.undefined
  ]),
  trait_type: ts.string,
  value: ts.union([ts.number, ts.string]),
  max_value: ts.union([ts.number, ts.undefined])
})

export const Property = ts.type({
  type: ts.string,
  description: ts.string
})

export const NFTPayload = ts.partial({
  owner: ts.string,
  title: ts.string,
  image: ts.union([ts.string, ts.null]),
  image_data: ts.string,
  image_url: ts.string,
  external_url: ts.string,
  description: ts.string,
  name: ts.string,
  attributes: ts.array(Attribute),
  background_color: ts.string,
  animation_url: ts.union([ts.string, ts.null]),
  youtube_url: ts.string
})

export const NFTMedia = ts.partial({
  image: ts.string,
  audio: ts.string,
  video: ts.string
})

export const ParsedNFT = ts.intersection([
  ts.type({
    title: ts.string,
    description: ts.string
  }),
  NFTMedia
])
