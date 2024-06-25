import React from 'react'

interface HighlightTextProps {
  text: string
  keywords: string[]
  disabled?: boolean
}

function HighlightText({ text, keywords, disabled = false }: HighlightTextProps) {
  const regex = new RegExp(`(${keywords.join('|').toLowerCase()})`, 'gi')

  const keys = keywords.map(k => k.toLowerCase())

  if (disabled) {
    return <span>{text}</span>
  }

  const highlightedText = text
    .split(regex)
    .map((part, index) =>
      keys.includes(part.toLowerCase()) ? (
        <strong key={index}>{part}</strong>
      ) : (
        part
      )
    )

  return <span>{highlightedText}</span>
}

export default React.memo(HighlightText)
