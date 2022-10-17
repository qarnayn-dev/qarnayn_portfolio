import React from 'react'

/**
 * Convert an `input` string into an array of string.
 * By default, it will turn the `input` into sentences (seperated by dot, commas etc).
 */
export const stringToArray = (input:string): string[] => {
    return (
        input.match(/([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/g)?.filter((value) => (value !== ' ' && value !== undefined) ? value : null).map((value) => value.trim()) ?? []
    )
}
